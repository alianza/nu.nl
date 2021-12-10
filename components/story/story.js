import { formatDate } from "../../lib/formatDate"

export default function Story(props) {
    return(
        <li style={{flexBasis: "16em"}} className="flex flex-col gap-2 flex-grow">
            <a style={{backgroundImage: `url(${props.item.enclosure._attributes.url})`}}
               className="title bg-cover bg-center bg-no-repeat relative z-10 p-2 rounded-t-lg"
               href={props.item.link} target="_blank" rel="noreferrer">
                <h2 className="text-xl text-white">{props.item.title}</h2></a>
            <span>{formatDate(new Date(props.item.pubDate))} om: {new Date(props.item.pubDate).toLocaleTimeString("nl", {hour12: false})}</span>
            <p className="text-sm"
               dangerouslySetInnerHTML={{
                   __html: !(props.item.description && Object.keys(props.item.description).length === 0) ?
                       props.item.description.toString() : "Geen beschrijving..."
               }}/>

            <style jsx>{`
              .title:hover {
                text-decoration-color: white;
              }

              .title::before {
                content: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAQElEQVR42qXKwQkAIAxDUUdxtO6/RBQkQZvSi8I/pL4BoGw/XPkh4XigPmsUgh0626AjRsgxHTkUThsG2T/sIlzdTsp52kSS1wAAAABJRU5ErkJggg==);
                position: absolute;
                bottom: .2em;
                right: .5em;
                filter: invert(1);
              }

              .title::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.35);
                z-index: -1;
                border-top-left-radius: 0.5rem;
                border-top-right-radius: 0.5rem;
              }
            `}
            </style>
    </li>
    )
}
