import { smoothScroll, transformTitle } from "../../lib/utils"

export default function QuickTabs({ channels }) {
  return (
    <ul className="quickTabs flex flex-row gap-4 overflow-x-auto max-w-full bg-accent-0 pb-2">
      {channels.map(channel => (
        <li key={channel.title}
            className="bg-accent-1 p-2 whitespace-nowrap rounded-xl border border-accent-3 cursor-pointer hover:border-accent-5 active:opacity-80">
          <a onClick={smoothScroll} href={`#${transformTitle(channel.title, true)}`}
             className="no-underline not-italic">{transformTitle(channel.title)}</a>
        </li>
      ))}

      <style jsx>{`
        .quickTabs::-webkit-scrollbar-track {
          box-shadow: none;
        }
      `}</style>
    </ul>
  )
}
