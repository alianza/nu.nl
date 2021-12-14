import { formatDate } from "../../lib/formatDate"
import { formatTime } from "../../lib/formatTime"

export default function Footer({buildTime}) {
    const buildTimeDate = new Date(buildTime)

    return (
        <footer className="absolute w-full bottom-0 h-16 p-4 shadow-allround flex justify-between items-center">
            <span>Author: <a href="https://jwvbremen.nl" target="_blank"
                             rel="noreferrer">Jan-Willem van Bremen</a></span>
        <span>Pagina gegenereerd: <span className="italic">{formatDate(buildTimeDate)} om: {formatTime(buildTimeDate)}</span></span>
    </footer>)
}
