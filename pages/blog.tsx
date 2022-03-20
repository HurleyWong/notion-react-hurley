import { useState } from 'react'
import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SearchModal from '../components/SearchModal'

import { getBlogDatabase } from '../lib/notion'
import { Search } from 'react-feather'

type BlogPosts = QueryDatabaseResponse['results']

const Blog: NextPage<{ posts: BlogPosts }> = ({ posts }) => {
  const [searchOpen, setSearchOpen] = useState(false)
  const openSearchBox = () => setSearchOpen(true)

  return (
    <div>
      <Head>
        <title>Hurley Wong - Blog</title>
        <meta name="description" content="Hurley Wong" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </Head>

      <div className="flex flex-col min-h-screen dark:bg-dark-900">
        <Navbar />
        <SearchModal searchOpen={searchOpen} setSearchOpen={setSearchOpen} />

        <main className="container flex flex-col mx-auto flex-1 max-w-3xl px-6">
          <h1 className="font-bold text-xl mb-8 heading-text flex items-center justify-between">
            <span>Blog</span>
            <button className="p-1 cursor-pointer hover:text-gray-500" onClick={openSearchBox}>
              <Search size={20} />
            </button>
          </h1>

          {posts.map((post: any) => (
            <Link key={post.id} href={`/blog/${post.properties.slug.rich_text[0].text.content}`} passHref>
              <div className="border-none rounded cursor-pointer -mx-2 mb-2 p-2 hover:bg-light-200 hover:opacity-80 dark:hover:bg-dark-700">
                <h2 className="flex space-x-2 text-lg mb-2 justify-between heading-text">
                  <span>{post.properties.name.title[0].text.content}</span>
                  <span>{post.icon.emoji}</span>
                </h2>

                <p className="text-sm primary-text">{post.properties.preview.rich_text[0].text.content}</p>

                <div className="flex flex-wrap space-x-2 text-sm secondary-text items-center">
                  <span>{post.properties.date.date.start}</span>
                  <span>·</span>
                  {post.properties.author.people.map((person: { name: string }) => (
                    <span key={person.name}>{person.name.toLowerCase()}</span>
                  ))}
                  <span>·</span>
                  <span>{post.properties.tag.select.name.toLowerCase()}</span>
                </div>
              </div>
            </Link>
          ))}
        </main>
        <Footer />
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const db = await getBlogDatabase()
  return {
    props: {
      posts: db,
    },
    revalidate: 60,
  }
}

export default Blog
