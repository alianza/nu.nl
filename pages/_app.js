import 'tailwindcss/tailwind.css'
import '../styles/global.scss'
import Layout from "../components/layout/layout";
import NextNProgress from "nextjs-progressbar";
import { useDarkThemeListener } from "../lib/eventListeners"
import { useState } from "react"
import Head from "next/head"

export async function getStaticProps() {
    return {
        props: {
            buildTime: new Date().toString()
        },
        revalidate: 120
    }
}

function MyApp({ Component, pageProps }) {
    const [darkTheme, setDarkTheme] = useState(false)

    useDarkThemeListener(setDarkTheme)

  return(
    <Layout buildTime={pageProps.buildTime}>
        <Head>
            <meta name="theme-color" content={darkTheme ? '#000' : '#fff'}/>
        </Head>
        <Component {...pageProps} />
        <NextNProgress color={darkTheme ? '#fff' : '#000'}/>
    </Layout>
  )
}

export default MyApp
