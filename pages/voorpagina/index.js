import { NuService } from "../../lib/services/nuService"
import Channel from "../../components/channelPreview/channel"
import { useState } from "react"
import StoryDialog from "../../components/storyDialog/storyDialog"
import Head from "next/head"

export async function getStaticProps() {
    const algemeen = await NuService.getVoorpagina()

    return {
        props: {
            channels: [
                algemeen
            ],
            buildTime: new Date().toString()
        },
        revalidate: 120
    }
}

export default function Home({ channels }) {
    const [story, setStory] = useState(null)

    return (
        <div className="flex flex-col items-center gap-8">
            <Head>
                <title>Nu.nl Feeds - {channels[0].title}</title>
            </Head>

            {channels.map(channel => ( <Channel key={channel.title} openStory={setStory} channel={channel}/> ))}

            <StoryDialog story={story} setStory={setStory}/>
        </div>
    )
}
