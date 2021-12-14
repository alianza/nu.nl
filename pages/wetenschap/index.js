import { NuService } from "../../lib/services/nuService"
import ChannelPreview from "../../components/channelPreview/channelPreview"
import { useState } from "react"
import StoryDialog from "../../components/storyDialog/storyDialog"

export async function getStaticProps() {
    const wetenschap = await NuService.getWetenschap()

    return {
        props: {
            channels: [
                wetenschap
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
            {channels.map(channel => ( <ChannelPreview key={channel.title} openStory={setStory} channel={channel}/> ))}

            <StoryDialog story={story}/>
        </div>
    )
}
