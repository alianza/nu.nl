export default function QuickTabs({channels}) {
    const scrollToChannel = (channel) => {
        document.getElementById(channel.title.replace('NU - ', '')).scrollIntoView({behavior: 'smooth'})
    }

    return (
        <ul className="quickTabs flex flex-row gap-4 overflow-x-auto max-w-full bg-accent-0 pb-2">
            {channels.map(channel => (
                <li key={channel.title} onClick={() => scrollToChannel(channel)}
                    className='bg-accent-1 p-2 whitespace-nowrap rounded-xl border border-accent-3 cursor-pointer hover:border-accent-5'>
                    {channel.title.replace('NU - ', '')}
                </li>
            ))}

            <style jsx>{`
              .quickTabs::-webkit-scrollbar-track {
                    box-shadow: none;
              }
            `}</style>
        </ul>)
}