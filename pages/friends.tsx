import { FC } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import { friends, FriendProps } from '../config/friend'
import Comments from '../components/Comments'

const FriendCard: FC<FriendProps> = props => {
  return (
    <a
      className="rounded bg-light-300 border-b-0 border-l-4 p-4 relative overflow-hidden dark:bg-dark-700"
      href={props.link}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        borderLeftColor: props.bgColor,
      }}
    >
      <p className="flex items-center justify-between hover:opacity-80">
        <div>
          <div className="font-bold">{props.id}</div>
          <div className="text-sm secondary-text">{props.link}</div>
        </div>
        {/* <Image src={props.avatar} width={32} height={32} alt={props.link} className="rounded-full" /> */}
      </p>
    </a>
  )
}

const Links: NextPage = () => {
  return (
    <div>
      <Head>
        <title>HurleyWong - Sites</title>
        <meta name="description" content="Spencer Woo" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </Head>

      <div className="flex flex-col min-h-screen dark:bg-dark-900">
        <Navbar />
        <main className="container flex flex-col mx-auto flex-1 max-w-3xl px-6">
          <h1 className="font-bold text-xl mb-8 heading-text">Friends</h1>

          <div className="mb-8 grid gap-4 grid-cols-1 sm:grid-cols-2">
            {friends.map((friend: FriendProps) => (
              <FriendCard key={friend.id} {...friend} />
            ))}
          </div>

          {/* <p className="text-center secondary-text">👇 Leave your comments down below 👇</p>

          <div className="mx-4">
            <Comments />
          </div> */}
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Links
