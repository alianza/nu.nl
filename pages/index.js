import { NuService } from "../lib/services/nuService"
import Channel from "../components/channelPreview/channel"
import { useState } from "react"
import StoryDialog from "../components/storyDialog/storyDialog"
import QuickTabs from "../components/quickTabs/quickTabs"

export async function getStaticProps() {
    return {
        props: {
            channels: await NuService.getAllChannels(),
            buildTime: new Date().toString()
        },
        revalidate: 60
    }
}

export default function Home({ channels }) {
    const [story, setStory] = useState(null)

    return (
        <div className="flex flex-col items-center gap-8">

            <QuickTabs channels={channels} />

            {channels.map(channel => (<Channel key={channel.title} openStory={setStory} channel={channel} linkToChannel/>))}

            <StoryDialog story={story} setStory={setStory}/>

        </div>
    )
}
