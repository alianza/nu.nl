import Head from "next/head"
import { useEffect } from "react"

export default function Layout({ children }) {

    useEffect(() => {
        document.body.dataset.theme = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : ''
    }, [])

    const themeMode = () => {
        document.body.dataset.theme = document.body.dataset.theme === 'dark' ? '' : 'dark'
    }

    return (
    <div id="app">
        <Head>
            <title>Nu.nl Feeds - Laatste nieuws</title>
            <link rel="icon" href="/favicon.ico"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta name="description" content="Laatste news feeds van Nu.nl"/>
            <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover' />
            <link rel="manifest" href="/manifest.json"/>
        </Head>

        <header className="fixed bg-accent-0 w-full h-header top-0 p-4 shadow flex justify-between items-center">
            <h1 className="text-xl">Nu.nl Nieuws</h1>
            <button onClick={themeMode}>Dark/light</button>
        </header>

        <main id="content">{children}</main>

        <footer className="absolute w-full bottom-0 h-16 p-4 shadow-3xl flex justify-between items-center">
            <span>Author: <a href="https://jwvbremen.nl" target="_blank" rel="noreferrer">Jan-Willem van Bremen</a></span>
        </footer>

    </div>)
}
