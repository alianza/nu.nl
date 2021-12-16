import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import styles from "./storyDialog.module.scss"

export default function StoryDialog({story, setStory}) {
    const router = useRouter()
    const [content, setContent] = useState(null)
    const [open, setOpen] = useState(false)
    const [currentPage] = useState(router.pathname)
    const [visible, setVisible] = useState(false)
    const transitionLength = 300

    const transition = { transition: `opacity ${transitionLength}ms ease-out, visibility ${transitionLength}ms ease-out` }
    const visibleStyle = { opacity: 1, visibility: 'visible', ...transition }
    const hiddenStyle = { opacity: 0, visibility: 'hidden', ...transition }

    useEffect(() => {
        if (router.asPath.includes('?artikel=') && !story) {
            const href = router.asPath.substring(router.asPath.indexOf('?artikel=') + '?artikel='.length, router.asPath.length)
            document.querySelector(`a[href*='${href}`)?.click()
        }
    }, [])

    useEffect(() => {
        const handleRouteChange = (e) => {
            if (e.includes('?artikel=') && !story) {
                document.querySelector(`a[href*='${e.substring(e.indexOf('?artikel=') + '?artikel='.length, e.length)}']`)?.click()
            } else {
                closeStory(false)
            }
        }

        router.events.on('routeChangeStart', handleRouteChange)

        return () => { router.events.off('routeChangeStart', handleRouteChange) }
    }, [])

    useEffect(() => {
        const loadStory = async (storyObj) => {
            if (!router.asPath.includes('?artikel=')) {
                router.push(router.pathname + `?artikel=${new URL(storyObj.link).pathname}`, undefined, { shallow: true })
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

        if (story) { loadStory(story).then(() => { openStory() })}
    }, [story])

    function openStory() {
        setOpen(true) // Mount dialog before animation
        setTimeout(() => {
            setVisible(true)
            document.body.classList.add('scroll-disabled')
        }, 100)
    }

    function closeStory(navigateBack = true) {
        if (navigateBack) { router.push(currentPage, undefined, { shallow: true }) }
        setVisible(false) // Hide dialog before unmounting
        setTimeout(() => {
            setOpen(false)
            setStory(null)
            document.body.classList.remove('scroll-disabled')
        }, transitionLength)
    }

    return ( <>
            {open &&  <>
                <div style={visible ? visibleStyle : hiddenStyle} className={`fixed inset-0 z-20 bg-black/50 text-text-primary cursor-pointer`} onClick={closeStory}/>
                <div style={visible ? visibleStyle : hiddenStyle} className={`${styles.dialog} -translate-y-1/2 -translate-x-1/2`}>
                    <button className="block ml-auto -my-2 mb-2 transition-transform hover:scale-125 p-2" onClick={closeStory}>✕</button>
                    <div dangerouslySetInnerHTML={{__html: content.toString()}}/>
                </div>
            </>}
        </>
    )
}