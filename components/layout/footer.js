import { formatDate } from "../../lib/formatDate"

export default function Footer({buildTime}) {
    const buildTimeDate = new Date(buildTime)

    return (
        <footer className="absolute w-full bottom-0 h-16 p-4 shadow-allround flex justify-between items-center">
            <span>Author: <a href="https://jwvbremen.nl" target="_blank"
                             rel="noreferrer">Jan-Willem van Bremen</a></span>
        <span>Pagina gegenereerd: <span className="italic">{formatDate(buildTimeDate)} om: {("0" + buildTimeDate.getHours()).slice(-2)}:{("0" + buildTimeDate.getMinutes()).slice(-2)}</span></span>
    </footer>)
}
