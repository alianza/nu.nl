import { NuService } from "../../lib/services/nuService"
import ChannelPreview from "../../components/channelPreview/channelPreview"

export async function getStaticProps() {
    const economie = await NuService.getEconomie()

    return {
        props: {
            channels: [
                economie
            ],
        },
        revalidate: 120
    }
}

export default function Home({ channels,  buildTime }) {
    return (
        <div className="flex flex-col items-center gap-8">
            {channels.map(channel => ( <ChannelPreview key={channel.title} channel={channel} /> ))}
        </div>
    )
}
