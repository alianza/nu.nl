import Link from 'next/link'
import Story from '../story/story'
import { useEffect, useState } from 'react'
import styles from './channelPreview.module.scss'
import { useRouter } from 'next/router'

export default function ChannelPreview({channel}) {
    const [open, setOpen] = useState(false)
    const [content, setContent] = useState(null)
    const router = useRouter()

    useEffect(() => {
        router.events.on('routeChangeStart', () => { setOpen(false) })
    }, [])

    const handleOpenStory = async (storyObj) => {
        router.push(`/?artikel`, undefined, { shallow: true })

        const storyHTML = await fetch('https://whatever.fly.dev/get?url=' + encodeURIComponent(storyObj.link))
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

            // console.log(story)
            // console.log(story?.firstElementChild)

            if (story?.firstElementChild) {
                story.firstElementChild.insertAdjacentHTML('afterend' ,`<a class='${styles.readFullStory}' href="${storyObj.link}" target="_blank" rel="noreferrer">Lees volledig bericht...</a>`)
                story.firstElementChild.insertAdjacentHTML('beforebegin' ,`<h1 class='${styles.title}' style="background-image: url('${storyObj.enclosure._attributes.url}')">${storyObj.title}</h1>`)
            }

            setContent(story.innerHTML)
        } else {
            setContent(`<h1 class='${styles.noContentFound}'>Geen content gevonden...</h1> <a href="${storyObj.link}" target="_blank" rel="noreferrer">Lees volledig bericht...</a>`)
        }
        setOpen(true)
        document.body.classList.add('scroll-disabled')
    }

    function closeStory() {
        router.back()
        setOpen(false)
        document.body.classList.remove('scroll-disabled')
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center">
                <Link href={channel.link.substr(channel.link.lastIndexOf('/'), channel.link.length)}><a>
                    <h1 className="text-2xl">{channel.title}</h1>
                </a></Link>
                <span
                    className="text-accent-6">
                    Laatste data: {new Date(channel.lastBuildDate).toLocaleTimeString('nl')}
                </span>
            </div>

            <ul className="flex flex-wrap justify-center gap-8 tablet:gap-4 w-full">
                {channel.item.map(item => (
                    <Story openStory={handleOpenStory} key={item.title} item={item}/>
                ))}
            </ul>
            {open && 
            <>
                <div className={`fixed inset-0 z-20 bg-black/50 text-text-primary cursor-pointer`} onClick={() => closeStory()} />

            <div className={`${styles.dialog} -translate-y-1/2 -translate-x-1/2`}>
                    <button className='block ml-auto mb-3 transition-transform hover:scale-125' onClick={() => closeStory()}>✕</button>
                <div dangerouslySetInnerHTML={{__html: content }} />
            </div>
            </>
            }
        </div>
    )
}
