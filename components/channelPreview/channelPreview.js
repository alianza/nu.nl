import Link from 'next/link'
import Story from '../story/story'
import { useState } from 'react'
import styles from './channelPreview.module.scss'
import { useRouter } from 'next/router'

export default function ChannelPreview({channel}) {
    const [open, setOpen] = useState(false)
    const [content, setContent] = useState(null)
    const router = useRouter()

    const handleOpenStory = async (storyObj) => { 
        router.push({ pathname: router.asPath }, undefined, { shallow: true })
        
        const storyHTML = await fetch('https://whatever.fly.dev/get?url=' + encodeURIComponent(storyObj.link))
        .then(response => response.json())
        .then(response => { return response })

        const doc = document.createRange().createContextualFragment(storyHTML.contents)

        const story = doc.querySelector('[data-type="article.body"]')

        doc.querySelectorAll('[data-type="video"]').forEach(video => { video.remove() })
        doc.querySelector('[data-type="call.to.action"]')?.remove()
        doc.querySelectorAll('div.timeline-block-wrapper').forEach(e => { e.style.marginTop = '1em' })
        doc.querySelector('div.timeline-footer')?.remove()
        doc.querySelectorAll('span.date').forEach(e => { e.style.fontStyle = 'italic'; e.parentElement.style.textAlign = 'right' })
        doc.querySelectorAll('div.consent_required').forEach(e => { e.remove() })
        
        console.log(story)
        // console.log(story?.parentNode)
        console.log(story?.firstElementChild)
        // console.log(story?.firstChild)

        if (story?.firstElementChild) {
            story.firstElementChild.insertAdjacentHTML('afterEnd' ,`<a style="display: block; margin-top: .5em;" href="${storyObj.link}" target="_blank" rel="noreferrer">Lees volledig bericht...</a>`)
            story.firstElementChild.insertAdjacentHTML('beforeBegin' ,`<h1 style="margin-top: 0;">${storyObj.title}</h1>`)
        }
        
        if (story) {
            setContent(story.innerHTML)
            setOpen(true)
        } else {
            setContent(`<p style="margin-top: 0; margin-bottom: .2em;">Geen content gevonden...</p> <a style="display: block;" href="${storyObj.link}" target="_blank" rel="noreferrer">Lees volledig bericht...</a>`)
            setOpen(true)
        }
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
                {channel.item.map((item, index) => (
                    <Story openStory={handleOpenStory} key={item.title} item={item}/>
                ))}
            </ul>
            {open && 
            <>
                <div className={`fixed inset-0 z-20 bg-black/50 text-text-primary cursor-pointer`} onClick={() => { setOpen(false) }} />

            <div className={`${styles.dialog} fixed h-[90%] left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-full mobile:w-4/5 max-w-3xl bg-accent-1 rounded-lg shadow-lg p-4 overflow-auto z-30`}>
                    <button className='block ml-auto transition-transform hover:scale-125' onClick={() => setOpen(false)}>✕</button>
                    <div dangerouslySetInnerHTML={{__html: content }} />
            </div>
            </>
            }
        </div>
    )
}
