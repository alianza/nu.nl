export default function Main({children}) {
    return (<main id="content"
                  className="transition-colors p-[calc(var(--header)+1em)_1em_calc(var(--footer)+1em)] max-w-[88em] m-[0_auto]">
                {children}
            </main>)
}
