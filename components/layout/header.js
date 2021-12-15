import { useEffect, useState } from "react"
import Link from "next/link"

const darkModeKey = "darkMode"

export default function Header() {
    const [theme, setTheme] = useState('')

    useEffect(() => {
        const matchDarkMedia = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')
        const savedTheme = localStorage.getItem(darkModeKey)

        if (savedTheme) { // If the user has a saved theme, use it and remove event listener
            document.body.dataset.theme = savedTheme
            setTheme(savedTheme)

            matchDarkMedia.removeEventListener('change', onColorSchemeChange)
        } else { // If no saved theme, use the browser's default and listen for operating system changes
            document.body.dataset.theme = matchDarkMedia.matches ? 'dark' : 'light'
            setTheme(document.body.dataset.theme)

            matchDarkMedia.addEventListener('change', onColorSchemeChange)
        }
    }, [theme])

    const changeTheme = () => {
        const newTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark'
        document.body.dataset.theme = newTheme
        localStorage.setItem(darkModeKey, newTheme)
        setTheme(newTheme)
    }

    const onColorSchemeChange = (e) => { document.body.dataset.theme = e.matches ? 'dark' : 'light' } // Prefers light/dark theme

    return <header className="fixed w-full h-header top-0 p-4 shadow flex justify-between items-center bg-accent-1 z-20 transition-colors">
        <Link href='/'><a><h1 className="text-xl not-italic">Nu.nl Nieuws</h1></a></Link>
        <button onClick={changeTheme} className="hover:scale-110 transition-transform p-4 m-[-1em]"
                title={`Change to ${theme === "light" ? "Dark" : "Light"} theme`}>{theme === "light" ? "🌙" : "☀"}</button>
    </header>
}
