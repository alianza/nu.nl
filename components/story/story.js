import { formatDate } from "../../lib/utils";
import NewTabIcon from "../newTabIcon/newTabIcon";
import { formatTime } from "../../lib/utils";
import { useEffect, useState } from "react";

// https://github.com/vercel/next.js/discussions/38263#discussioncomment-3162871

export default function Story({ item, openStory }) {
  const [date, setDate] = useState(null);

  useEffect(() => setDate(`${formatDate(item.pubDate)} om: ${formatTime(new Date(item.pubDate))}`), []);

  return (
    <li
      tabIndex="0"
      className="relative flex flex-grow basis-64 flex-col gap-2 rounded-lg outline-offset-4 outline-accent-6 focus:outline focus:outline-1 active:outline active:outline-1"
    >
      <div
        style={{ backgroundImage: `url(${item.enclosure._attributes.url})` }}
        className="relative z-10 rounded-t-lg bg-cover bg-center bg-no-repeat p-2 text-xl text-white"
      >
        <a
          className="py-1 after:absolute after:top-0 after:left-0 after:z-[-1] after:h-full after:w-full after:rounded-t-lg after:bg-black/50"
          href={item.link}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => {
            e.preventDefault();
            openStory(item);
          }}
        >
          {item.title}
        </a>
        <a
          className="before:margin-1 before:relative before:inline-block before:h-[24px] before:w-[24px] before:align-text-bottom"
          href={item.link}
          target="_blank"
          rel="noreferrer"
          title="Lees volledig bericht..."
        >
          <NewTabIcon className="absolute bottom-1 right-1 ml-auto p-2 invert transition-transform hover:scale-125" />
        </a>
      </div>
      <span>{date}</span>
      <p
        className="text-sm"
        dangerouslySetInnerHTML={{
          __html: item.description && typeof item.description === "string" ? item.description : "Geen beschrijving...",
        }}
      />
    </li>
  );
}
