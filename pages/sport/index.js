import { NuService } from "../../lib/services/nuService"
import ChannelPreview from "../../components/channelPreview/channelPreview"

export async function getStaticProps() {
    const sport = await NuService.getSport()

    return {
        props: {
            channels: [
                sport
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
