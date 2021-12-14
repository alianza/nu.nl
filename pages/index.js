import { NuService } from "../lib/services/nuService"
import Channel from "../components/channelPreview/channel"
import { useState } from "react"
import StoryDialog from "../components/storyDialog/storyDialog"
import QuickTabs from "../components/quickTabs/quickTabs"

export async function getStaticProps() {
    const algemeen = await NuService.getAlgemeen('4')
    const opmerkelijk = await NuService.getOpmerkelijk('4')
    const wetenschap = await NuService.getWetenschap('4')
    const gezondheid = await NuService.getGezondheid('4')
    const tech = await NuService.getTech('4')
    const sport = await NuService.getSport('4')
    const economie = await NuService.getEconomie('4')
    const film = await NuService.getFilm('4')
    const muziek = await NuService.getMuziek('4')
    const achterklap = await NuService.getAchterklap('4')
    const podcast = await NuService.getPodcast('4')

    return {
        props: {
            channels: [
                algemeen,
                opmerkelijk,
                wetenschap,
                gezondheid,
                tech,
                sport,
                economie,
                film,
                muziek,
                achterklap,
                podcast
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

            <QuickTabs channels={channels} />

            {channels.map(channel => (<Channel key={channel.title} openStory={story => {setStory(story)}} channel={channel}/>))}

            <StoryDialog story={story} unsetStory={setStory}/>

        </div>
    )
}
