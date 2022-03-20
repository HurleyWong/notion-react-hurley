import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Publication: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Hurley Wong - Academic</title>
        <meta name="description" content="Hurley Wong" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </Head>

      <div className="flex flex-col min-h-screen dark:bg-dark-900">
        <Navbar />
        <main className="container flex flex-col mx-auto flex-1 max-w-3xl px-6">
          <h1 className="font-bold text-xl mb-8 heading-text">Academic</h1>

          <p>
            <a
              href="https://doi.org/10.1145/3241737"
              target="_blank"
              rel="noopener noreferrer"
              className="border-none rounded -m-2 p-2 hover:bg-light-200 dark:hover:bg-dark-700"
            >
              <div className="flex flex-wrap font-mono text-xs mb-1 gap-1 uppercase">
                <span className="rounded-full bg-green-200 px-2 dark:(bg-green-700 text-white) ">Cloud computing</span>
                <span className="rounded-full bg-red-200 px-2 dark:(bg-red-700 text-white) ">Fog computing</span>
                <span className="rounded-full bg-blue-200 px-2 dark:(bg-blue-700 text-white) ">
                  Serverless computing
                </span>
              </div>
              <h2 className="font-bold primary-text">
                A Manifesto for Future Generation Cloud Computing: Research Directions for the Next Decade
              </h2>
              <div className="text-sm secondary-text">
                Buyya, Rajkumar, et al
              </div>
            </a>
          </p>

          <p>
            <a
              href="https://doi.org/10.1016/j.jpdc.2020.06.015"
              target="_blank"
              rel="noopener noreferrer"
              className="border-none rounded -m-2 p-2 hover:bg-light-200 dark:hover:bg-dark-700"
            >
              <div className="flex flex-wrap font-mono text-xs mb-1 gap-1 uppercase">
                <span className="rounded-full bg-green-200 px-2 dark:(bg-green-700 text-white) ">Augmented democracy</span>
                <span className="rounded-full bg-red-200 px-2 dark:(bg-red-700 text-white) ">Blockchain</span>
                <span className="rounded-full bg-blue-200 px-2 dark:(bg-blue-700 text-white) ">
                  Consensus mechanism
                </span>
                <span className="rounded-full bg-yellow-200 px-2 dark:(bg-yellow-700 text-white) ">Witness presence</span>
              </div>
              <h2 className="font-bold primary-text">
                Proof of witness presence: Blockchain consensus for augmented democracy in smart cities
              </h2>
              <div className="text-sm secondary-text">
                <span className="font-bold">Pournaras, Evangelos</span>
              </div>
            </a>
          </p>

          <p>
            <a
              href="https://doi.org/10.1007/s00607-019-00771-y"
              target="_blank"
              rel="noopener noreferrer"
              className="border-none rounded -m-2 p-2 hover:bg-light-200 dark:hover:bg-dark-700"
            >
              <div className="flex flex-wrap font-mono text-xs mb-1 gap-1 uppercase">
                <span className="rounded-full bg-green-200 px-2 dark:(bg-green-700 text-white) ">Cycling</span>
                <span className="rounded-full bg-red-200 px-2 dark:(bg-red-700 text-white) ">Risk</span>
                <span className="rounded-full bg-blue-200 px-2 dark:(bg-blue-700 text-white) ">
                  Smart city
                </span>
              </div>
              <h2 className="font-bold primary-text">
                On cycling risk and discomfort: urban safety mapping and bike route recommendations
              </h2>
              <div className="text-sm secondary-text">
                Castells-Graells, David, Christopher Salahub, <span className="font-bold">Evangelos Pournaras</span>
              </div>
            </a>
          </p>

          <p className="mt-12 font-mono text-xs">
            <abbr title="more">No more</abbr>
          </p>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Publication
