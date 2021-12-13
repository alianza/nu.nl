import { formatDate } from "../../lib/formatDate"

export default function Story(props) {
    const storyDate = new Date(props.item.pubDate)
    const dateString = `${formatDate(storyDate)} om: ${storyDate.getHours()}:${storyDate.getMinutes()}`

    return(
        <li style={{flexBasis: "16em"}} className="flex flex-col gap-2 flex-grow">
            <a style={{backgroundImage: `url(${props.item.enclosure._attributes.url})`}}
               className="text-white text-xl bg-cover bg-center bg-no-repeat relative z-10 p-2 rounded-t-lg
               before:content-[url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAQElEQVR42qXKwQkAIAxDUUdxtO6/RBQkQZvSi8I/pL4BoGw/XPkh4XigPmsUgh0626AjRsgxHTkUThsG2T/sIlzdTsp52kSS1wAAAABJRU5ErkJggg==)]
               before:absolute before:bottom-1 before:right-2 before:invert
               after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-black/25 after:z-[-1] after:rounded-t-lg"
               href={props.item.link} target="_blank" rel="noreferrer">{props.item.title}</a>
            <span>{dateString}</span>
            <p className="text-sm"
               dangerouslySetInnerHTML={{
                   __html: !(props.item.description && Object.keys(props.item.description).length === 0) ?
                       props.item.description.toString() : "Geen beschrijving..."
               }}/>
    </li>
    )
}
