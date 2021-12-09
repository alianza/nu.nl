import 'tailwindcss/tailwind.css'
import '../styles/global.scss'
import Layout from "../components/layout/layout";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
  return(
    <Layout>
        <Component {...pageProps} />
        <NextNProgress color={'#020051'}/>
    </Layout>
  )

}

export default MyApp
