import Head from "next/head"
import Header from "./header"
import Footer from "./footer"
import Main from "./main"

export default function Layout({ children, buildTime }) {
    return (
    <div id="app" className='relative min-h-100vh bg-accent-0 transition-colors text-text-primary'>
        <Head>
            <title>Nu.nl Feeds - Laatste nieuws</title>
            <link rel="icon" href="/favicon.ico"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta name="description" content="Laatste news feeds van Nu.nl"/>
            <meta name='viewport'
                  content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover'/>
            <link rel="manifest" href="/manifest.json"/>
        </Head>

        <Header/>

        <Main>{children}</Main>

        <Footer buildTime={buildTime}/>

    </div>)
}
