import Head from 'next/head'
import '../styles/global.css'

function MyApp({ Component, pageProps }) {

  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <title> Datasheet </title>
        <meta name="description" content={'Data Table of Employees'} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={'Datasheet'} />
        <meta property="og:description" content={'Data Table of Employees'} />
        <meta property="og:site_name" content={'Datasheet'} />
      </Head>

      <Component {...pageProps} />
    </>
  )
}

export default MyApp
