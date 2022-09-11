import Link from 'next/link'
import Story from '../story/story'
import { formatDate, months, transformTitle } from "../../lib/utils"
import { formatTime } from "../../lib/utils"
import { useEffect, useState } from "react"

export default function Channel({channel, openStory, linkToChannel}) {
    const channelLink = channel.link.substring(channel.link.lastIndexOf('/'), channel.link.length)
    const [date, setDate] = useState(null)

    useEffect(() => setDate(formatDate(new Date(channel.lastBuildDate))), [])

    useEffect(() => {
      if (date && !months.some(value => date.includes(value))) {
        setDate(`${formatDate(new Date(channel.lastBuildDate))} om: ${formatTime(new Date(channel.lastBuildDate))}`)
      }
    }, [date])

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center">
                {linkToChannel ?
                    <Link href={channelLink}>
                        <a className='relative group flex items-center'>
                            <span id={transformTitle(channel.title, true)} className="absolute -top-20"/>
                            <h1 className="text-2xl">{channel.title}</h1>
                            <span className='absolute w-6 -right-6 text-2xl text-right transition-all group-hover:w-8 group-hover:-right-8'>→</span>
                        </a>
                    </Link> : <h1 className="text-2xl">{channel.title}</h1>}
                <span className="text-accent-6"> Laatste data: {date}</span>
            </div>

            <ul className="flex flex-wrap justify-center gap-8 tablet:gap-4 w-full">
                {channel.item.map(item => <Story openStory={openStory} key={item.title} item={item}/> )}
            </ul>
        </div>
    )
}
