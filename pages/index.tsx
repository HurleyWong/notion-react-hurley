import type { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import Footer from '../components/Footer'
import Main from '../components/Main'
import Navbar from '../components/Navbar'

import TOPOLOGY from 'vanta/dist/vanta.topology.min'

const Home: NextPage = () => {
  const [vantaEffect, setVantaEffect] = useState<any>(0)
  const vantaRef = useRef(null)

  useEffect(() => {
    const p5 = require('p5')

    if (!vantaEffect) {
      setVantaEffect(
        TOPOLOGY({
          el: vantaRef.current,
          p5: p5,
          mouseControls: true,
          touchControls: true,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x4e9196,
          backgroundColor: 0x1522,
        })
      )
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])

  return (
    <div>
      <Head>
        <title>Hurley</title>
        <meta name="description" content="Hurley Wong" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </Head>

      <div className="flex flex-col min-h-screen bg-[#001522] dark" ref={vantaRef}>
        <Navbar />
        <Main />
        <Footer />
      </div>
    </div>
  )
}

export default Home
