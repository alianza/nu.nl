import { formatDate } from "../../lib/formatDate"

export default function ChannelPreview({channel}) {
    return (
        <>
            <div className="flex flex-col items-center">
                <h1 className="text-xl">{channel.title}</h1>
                <span
                    className="text-accent-6">Laatste data: {new Date(channel.lastBuildDate).toLocaleTimeString('nl')}</span>
            </div>

            <ul className="flex flex-wrap justify-center gap-4 w-full">
                {channel.item.map((item, index) => (
                    <li key={index} className="flex flex-col w-64 gap-2">
                        <a href={item.link}><h2 className="text-xl">{item.title}</h2></a>
                        <span>{formatDate(new Date(item.pubDate))} om: {new Date(item.pubDate).toLocaleTimeString('nl', {hour12: false})}</span>
                        <p className="text-sm" dangerouslySetInnerHTML={{__html: item.description}}/>
                    </li>
                ))}
            </ul>
        </>
    )
}
