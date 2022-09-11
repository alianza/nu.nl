import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import styles from "./storyDialog.module.scss"
import Head from "next/head"
import { StoryService } from "../../lib/services/storyService"
import { formatDate, formatTime } from "../../lib/utils"

const transitionLength = 300

export default function StoryDialog({story, setStory}) {
    const router = useRouter()
    const [content, setContent] = useState(null)
    const [open, setOpen] = useState(false)
    const [visible, setVisible] = useState(false)
    const [date, setDate] = useState(null)
    const currentPage = router.pathname

    const transition = { transition: `opacity ${transitionLength}ms ease-out, visibility ${transitionLength}ms ease-out` }
    const visibleStyle = { opacity: 1, visibility: 'visible', ...transition }
    const hiddenStyle = { opacity: 0, visibility: 'hidden', ...transition }

    useEffect(() => {
        const handleRouteChange = async (e) => {
            if (e.includes('?artikel=') && !story) {
                document.querySelector(`a[href*='${e.substring(e.indexOf('?artikel=') + '?artikel='.length, e.length)}']`)?.click()
            } else {
                await closeStory(false)
            }
        }

        router.events.on('routeChangeStart', handleRouteChange)

        if (router.asPath.includes('?artikel=') && !story) {
            const href = router.asPath.substring(router.asPath.indexOf('?artikel=') + '?artikel='.length, router.asPath.length)
            document.querySelector(`a[href*='${href}`)?.click()
        }

        return () => router.events.off('routeChangeStart', handleRouteChange)
    }, [])

    useEffect(() => {
        if (story) {
            loadStory(story).then(() => openStory())
        }
    }, [story])

    function openStory() {
        setOpen(true) // Mount dialog before animation
        setTimeout(() => {
            setVisible(true)
            document.body.classList.add('scroll-disabled')
        }, 100)
    }

    async function closeStory(navigateBack = true) {
        if (navigateBack) { await router.push(currentPage, undefined, { shallow: true }) }
        setVisible(false) // Hide dialog before unmounting
        setTimeout(() => {
            setOpen(false)
            setStory(null)
            document.body.classList.remove('scroll-disabled')
        }, transitionLength)
    }

    async function loadStory(storyObj) {
        if (!router.asPath.includes('?artikel=')) {
            await router.push(router.pathname + `?artikel=${new URL(storyObj.link).pathname}`, undefined, { shallow: true })
        }

        const storyHTML = await StoryService.fetchStory(storyObj.link)
        const doc = document.createRange().createContextualFragment(storyHTML.contents)
        let story = doc.querySelector('[data-type="article.body"]') || doc.querySelector('article.col-main')

        if (story) {
            StoryService.transformStory(story, storyObj)
            setContent(story.innerHTML)
            setDate(`${formatDate(story.pubDate)} om: ${formatTime(new Date(story.pubDate))}`)
        } else {
            setContent(`<h1 class='${styles.noContentFound}'>Geen content gevonden...</h1> <a href="${storyObj.link}" target="_blank" rel="noreferrer">Lees volledig bericht...</a>`)
        }
    }

    return (<>
          {open && <>
              <Head>
                  <title>{`Nu.nl feeds - ${story?.title}`}</title>
              </Head>
              <div style={visible ? visibleStyle : hiddenStyle}
                   className={`fixed inset-0 z-20 bg-black/50 text-text-primary cursor-pointer`} onClick={closeStory}/>
              <div style={visible ? visibleStyle : hiddenStyle}
                   className={`${styles.dialog} -translate-y-1/2 -translate-x-1/2`}>
                <div className="flex justify-between items-center -mt-4">
                  <span>{date}</span>
                  <button className="transition-transform hover:scale-125 active:scale-95 p-4 -mr-2" onClick={closeStory}>✕</button>
                </div>

                  <div dangerouslySetInnerHTML={{ __html: content.toString() }}/>
              </div>
          </>}
      </>
    )
}
