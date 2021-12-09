import { NuService } from "../lib/services/nuService"
import ChannelPreview from "../components/channelPreview/channelPreview"

export async function getStaticProps() {
    const algemeen = await NuService.getAlgemeen()
    const economie = await NuService.getEconomie()

    algemeen.item = algemeen.item.slice(0, 4)
    economie.item = economie.item.slice(0, 4)

    return {
        props: {
            algemeen,
            economie,
            buildTime: new Date().toString()
        },
        revalidate: 120
    }
}

export default function Home({ algemeen, economie, buildTime }) {

    console.log('buildTime:' ,buildTime)

    return (
        <div className="flex flex-col items-center gap-4">
            <ChannelPreview channel={algemeen} />

            <ChannelPreview channel={economie} />
        </div>
    )
}
