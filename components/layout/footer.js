import { formatDate } from "../../lib/utils"
import { formatTime } from "../../lib/utils"
import { useEffect, useState } from "react"

// https://github.com/vercel/next.js/discussions/38263#discussioncomment-3162871

export default function Footer({ buildTime }) {
  const [date, setDate] = useState(null)

  useEffect(() => setDate(`${formatDate(new Date(buildTime))} om: ${formatTime(new Date(buildTime))}`), [])

  return (
    <footer className="absolute w-full bottom-0 h-16 p-4 shadow-allround bg-accent-1 flex justify-between items-center">
        <span>Author: <a href="https://jwvbremen.nl" target="_blank" rel="noreferrer">Jan-Willem van Bremen</a></span>
        <span>Pagina gegenereerd: <span className="italic">{date}</span></span>
    </footer>
  )
}
