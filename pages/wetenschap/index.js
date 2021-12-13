import { NuService } from "../../lib/services/nuService"
import ChannelPreview from "../../components/channelPreview/channelPreview"

export async function getStaticProps() {
    const wetenschap = await NuService.getWetenschap()

    return {
        props: {
            channels: [
                wetenschap
            ],
        },
        revalidate: 120
    }
}

export default function Home({ channels
 }) {
    return (
        <div className="flex flex-col items-center gap-8">
            {channels.map(channel => ( <ChannelPreview key={channel.title} channel={channel} /> ))}
        </div>
    )
}
