import { NuService } from "../lib/services/nuService"
import ChannelPreview from "../components/channelPreview/channelPreview"

export async function getStaticProps() {
    const algemeen = await NuService.getAlgemeen('4')
    const economie = await NuService.getEconomie('4')

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

    console.log('buildTime:' , new Date(buildTime).toLocaleString('nl'))

    return (
        <div className="flex flex-col items-center gap-8">
            <ChannelPreview channel={algemeen} />

            <ChannelPreview channel={economie} />
        </div>
    )
}
