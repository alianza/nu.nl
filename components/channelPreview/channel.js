import Link from 'next/link'
import Story from '../story/story'
import { formatDate, months } from "../../lib/formatDate"
import { formatTime } from "../../lib/formatTime"

export default function Channel({channel, openStory, linkToChannel}) {
    const channelLink = channel.link.substr(channel.link.lastIndexOf('/'), channel.link.length)
    const channelDate = new Date(channel.lastBuildDate)

    let formattedDate = formatDate(channelDate)

    if (!months.some(value => formattedDate.includes(value))) { // If date doesn't contain month name, add time
        formattedDate = `${formattedDate} om: ${formatTime(channelDate)}`
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center">
                {linkToChannel ?
                    <Link href={channelLink}>
                        <a className='relative group flex items-center'>
                            <span id={channel.title.replace('NU - ', '')} className="absolute -top-20"/>
                            <h1 className="text-2xl">{channel.title}</h1>
                            <span className='absolute -right-6 text-2xl transition-transform group-hover:translate-x-2'>→</span>
                        </a>
                    </Link> : <h1 className="text-2xl">{channel.title}</h1>}
                <span className="text-accent-6"> Laatste data: {formattedDate}</span>
            </div>

            <ul className="flex flex-wrap justify-center gap-8 tablet:gap-4 w-full">
                {channel.item.map(item => <Story openStory={openStory} key={item.title} item={item}/> )}
            </ul>
        </div>
    )
}
