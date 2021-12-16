import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import styles from "./storyDialog.module.scss"

export default function StoryDialog({story, unsetStory}) {
    const router = useRouter()
    const [content, setContent] = useState(null)
    const [open, setOpen] = useState(false)
    const [currentPage] = useState(router.pathname)

    useEffect(() => {
        const handleRouteChange = (e) => {
            if (e.includes('?artikel=')) {
                document.querySelector(`a[href*='${e.substring(e.indexOf('?artikel=') + '?artikel='.length, e.length)}']`)?.click()
            } else {
                setOpen(false)
                document.body.classList.remove('scroll-disabled')
            }
        }

        router.events.on('routeChangeStart', handleRouteChange)

        return () => { router.events.off('routeChangeStart', handleRouteChange) }
    }, [])

    useEffect(() => {
        const loadStory = async (storyObj) => {
            if (!router.asPath.includes('?artikel=')) {
                router.push(router.asPath + `?artikel=${new URL(storyObj.link).pathname}`, undefined, { shallow: true })
            }

            const storyHTML = await fetch(`https://whatever.fly.dev/get?url=${encodeURIComponent(storyObj.link)}`)
                .then(response => response.json())
                .then(response => { return response })

            const doc = document.createRange().createContextualFragment(storyHTML.contents)

            const story = doc.querySelector('[data-type="article.body"]')

            if (story) {

                story.querySelectorAll('[data-type="video"]').forEach(video => { video.remove() })
                story.querySelector('[data-type="call.to.action"]')?.remove()
                story.querySelectorAll('div.timeline-block-wrapper').forEach(e => { e.style.marginTop = '1em' })
                story.querySelector('div.timeline-footer')?.remove()
                story.querySelectorAll('span.date').forEach(e => { e.style.fontStyle = 'italic'; e.parentElement.style.textAlign = 'right' })
                story.querySelectorAll('div.consent_required').forEach(e => { e.remove() })
                story.querySelectorAll('div[data-type="followtag"]').forEach(e => { e.remove() })
                story.querySelectorAll('img[data-src*="media.nu.nl"]').forEach(e => { e.src = e.getAttribute('data-src'); e.style.margin = "1em auto" })
                story.querySelectorAll('a[href^="/"]').forEach(e => { e.setAttribute('href', `https://nu.nl${e.getAttribute('href')}`) })
                story.querySelectorAll('div.timeline-block-wrapper.banner_block').forEach(e => { e.remove() })
                story.querySelectorAll('div.timeline-block-wrapper.video_block').forEach(e => { e.remove() })
                story.querySelectorAll('div.twitter>:not(div.twitter)').forEach(e => { e.classList.add(styles.twitter) })

                if (story?.firstElementChild) {
                    story.firstElementChild.insertAdjacentHTML('afterend' ,
                        `<a class='${styles.readFullStory}' href="${storyObj.link}" target="_blank" rel="noreferrer">Lees volledig bericht...</a>`)
                    story.firstElementChild.insertAdjacentHTML('beforebegin' ,
                        `<h1 class='${styles.title}' style="background-image: url('${storyObj.enclosure._attributes.url}')">${storyObj.title}</h1>`)
                }

                setContent(story.innerHTML)
            } else {
                setContent(`<h1 class='${styles.noContentFound}'>Geen content gevonden...</h1> <a href="${storyObj.link}" target="_blank" rel="noreferrer">Lees volledig bericht...</a>`)
            }
        }

        if (story) {
            loadStory(story).then(() => {
                setOpen(true)
                document.body.classList.add('scroll-disabled')
            })
        }
    }, [story])

    function closeStory() {
        router.push(currentPage, undefined, { shallow: true })
        setOpen(false)
        unsetStory(null)
        document.body.classList.remove('scroll-disabled')
    }

    return ( <>
            {open &&  <>
                <div className={`fixed inset-0 z-20 bg-black/50 text-text-primary cursor-pointer`} onClick={closeStory}/>
                <div className={`${styles.dialog} -translate-y-1/2 -translate-x-1/2`}>
                    <button className="block ml-auto mb-3 transition-transform hover:scale-125" onClick={closeStory}>✕</button>
                    <div dangerouslySetInnerHTML={{__html: content.toString()}}/>
                </div>
            </>}
        </>
    )
}