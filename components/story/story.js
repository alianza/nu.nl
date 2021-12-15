import { formatDate } from "../../lib/formatDate"
import NewTabIcon from "../newTabIcon/newTabIcon"
import { formatTime } from "../../lib/formatTime"

export default function Story(props) {
    const storyDate = new Date(props.item.pubDate)
    const dateString = `${formatDate(props.item.pubDate)} om: ${formatTime(storyDate)}`

    return(
        <li tabIndex='0' className="flex flex-col gap-2 flex-grow relative basis-64 rounded-lg outline-offset-4 outline-accent-6 focus:outline focus:outline-1 active:outline active:outline-1">
            <div style={{backgroundImage: `url(${props.item.enclosure._attributes.url})`}}
                 className="text-white text-xl bg-cover bg-center bg-no-repeat relative z-10 p-2 rounded-t-lg">
                <a className="py-1 after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-black/50 after:z-[-1] after:rounded-t-lg"
                   href={props.item.link} target="_blank" rel="noreferrer" onClick={e => { e.preventDefault(); props.openStory(props.item)}}>
                    {props.item.title}</a>
                <a className="before:margin-1 before:relative before:w-[24px] before:h-[24px] before:inline-block before:align-text-bottom"
                   href={props.item.link} target="_blank" rel="noreferrer" title="Lees volledig bericht...">
                    <NewTabIcon className='absolute bottom-1 right-1 ml-auto p-2 invert transition-transform hover:scale-125'/>
                </a>
            </div>
            <span>{dateString}</span>
            <p className="text-sm"
               dangerouslySetInnerHTML={{
                   __html: !(props.item.description && Object.keys(props.item.description).length === 0) ?
                       props.item.description.toString() : "Geen beschrijving..."
               }}/>
        </li>
    )
}
