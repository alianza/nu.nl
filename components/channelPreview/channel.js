import Link from "next/link";
import Story from "../story/story";
import { formatDate, months, transformTitle } from "../../lib/utils";
import { formatTime } from "../../lib/utils";
import { useEffect, useState } from "react";

// https://github.com/vercel/next.js/discussions/38263#discussioncomment-3162871

export default function Channel({ channel, openStory, linkToChannel }) {
    const channelLink = channel.link.substring(channel.link.lastIndexOf("/"), channel.link.length);
    const [date, setDate] = useState(null);

    useEffect(() => setDate(formatDate(new Date(channel.lastBuildDate))), []);

    useEffect(() => {
        if (date && !months.some((value) => date.includes(value))) {
            setDate(
                `${formatDate(new Date(channel.lastBuildDate))} om: ${formatTime(new Date(channel.lastBuildDate))}`,
            );
        }
    }, [date]);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center">
                {linkToChannel ? (
                    <Link href={channelLink} className="group relative flex items-center">
                        <span id={transformTitle(channel.title, true)} className="absolute -top-20" />
                        <h1 className="text-2xl">{channel.title}</h1>
                        <span className="absolute -right-6 w-6 text-right text-2xl transition-all group-hover:-right-8 group-hover:w-8">
                            →
                        </span>
                    </Link>
                ) : (
                    <h1 className="text-2xl">{channel.title}</h1>
                )}
                <span className="text-accent-6"> Laatste data: {date}</span>
            </div>

            <ul className="flex w-full flex-wrap justify-center gap-8 tablet:gap-4">
                {channel.item.map((item) => (
                    <Story openStory={openStory} key={item.title} item={item} />
                ))}
            </ul>
        </div>
    );
}
