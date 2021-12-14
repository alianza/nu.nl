import Link from 'next/link'
import Story from '../story/story'

export default function Channel({channel, openStory}) {
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
                    <Story openStory={openStory} key={item.title} item={item}/>
                ))}
            </ul>
        </div>
    )
}
