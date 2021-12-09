import 'tailwindcss/tailwind.css'
import '../styles/global.scss'
import Layout from "../components/layout/layout";
import NextNProgress from "nextjs-progressbar";

export async function getStaticProps() {
    return {
        props: {
            buildTime: new Date().toString()
        },
        revalidate: 120
    }
}

function MyApp({ Component, pageProps }) {
  return(
    <Layout buildTime={pageProps.buildTime}>
        <Component {...pageProps} />
        <NextNProgress color={'#020051'}/>
    </Layout>
  )
}

export default MyApp
