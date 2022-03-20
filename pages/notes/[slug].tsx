import type { GetServerSideProps, NextPage } from 'next'
import { Fragment } from 'react'
import { ParsedUrlQuery } from 'querystring'

import Head from 'next/head'
import { useRouter } from 'next/router'

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { renderNotionBlock } from '../../components/NotionBlockRenderer'

import { getNotesDatabase, getPage, getBlocks } from '../../lib/notion'
import probeImageSize from '../../lib/imaging'
import Comments from '../../components/Comments'
import Link from 'next/link'
import { ArrowLeft, Bookmark, MessageCircle } from 'react-feather'
import BlogCopyright from '../../components/BlogCopyright'
import BlogToc from '../../components/BlogToc'

const Post: NextPage<{ page: any; blocks: any[] }> = ({ page, blocks }) => {
  const router = useRouter()
  const hostname = typeof window !== 'undefined' ? window.location.origin : 'https://hurleywong.com'

  if (!page || !blocks) return <div></div>

  return (
    <div>
      <Head>
        <title>{page.properties.name.title[0].plain_text} - Hurley&apos;s Notes</title>
        <meta name="description" content="Hurley Wong" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </Head>

      <div className="flex flex-col min-h-screen dark:bg-dark-900">
        <Navbar />

        <main className="container mx-auto max-w-3xl lg:max-w-5xl gap-8 px-6 grid grid-cols-10 relative">
          <div className="flex flex-col col-span-10 lg:col-span-7">
            <div className="rounded border-gray-400/30 -mx-4 p-4 md:border">
              <h1 className="flex space-x-2 text-xl mb-2 justify-between">
                <span className="font-bold">{page.properties.name.title[0].plain_text}</span>
                <span>{page.icon.emoji}</span>
              </h1>
              <div className="flex flex-wrap space-x-2 h-8 mb-8 secondary-text items-center">
                <span>{page.properties.date.date.start}</span>
                <span>·</span>
                {page.properties.author.people.map((person: { name: string }) => (
                  <span key={person.name}>{person.name.toLowerCase()}</span>
                ))}
                <span>·</span>
                <div className="inline-flex items-center space-x-1">
                  <Bookmark size={18} />
                  <span>{page.properties.tag.select.name.toLowerCase()}</span>
                </div>
                <span>·</span>
                <Link href="#comments-section" passHref>
                  <div className="inline-flex items-center space-x-1 cursor-pointer">
                    <MessageCircle size={18} />
                    <a>comments</a>
                  </div>
                </Link>
              </div>

              {blocks.map(block => (
                <Fragment key={block.id}>{renderNotionBlock(block)}</Fragment>
              ))}

              <BlogCopyright page={page} absoluteLink={`${hostname}/notes/${router.query.slug}`} />
            </div>

            <Link href="/notes" passHref>
              <div className="border rounded cursor-pointer flex border-gray-400/30 mt-4 p-4 items-center justify-between md:-mx-4 hover:(bg-light-200 opacity-80) dark:hover:bg-dark-700 ">
                <span>return to notes</span>
                <ArrowLeft />
              </div>
            </Link>

            {/* <Comments /> */}
          </div>

          <BlogToc blocks={blocks} />
        </main>
        <Footer />
      </div>
    </div>
  )
}

// export const getStaticPaths = async () => {
//   const db = await getDatabase()
//   return {
//     paths: db.map((p: any) => ({ params: { slug: p.properties.slug.rich_text[0].text.content } })),
//     fallback: 'blocking',
//   }
// }

interface Props extends ParsedUrlQuery {
  slug: string
}
export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
  res.setHeader('Cache-Control', 'max-age=0, s-maxage=60, stale-while-revalidate')

  const { slug } = params as Props
  const db = await getNotesDatabase(slug)
  const post = db[0].id

  const page = await getPage(post)
  const blocks = await getBlocks(post)

  console.log(blocks)

  // Retrieve all child blocks fetched
  const childBlocks = await Promise.all(
    blocks
      .filter((b: any) => b.has_children)
      .map(async b => {
        return {
          id: b.id,
          children: await getBlocks(b.id),
        }
      })
  )
  const blocksWithChildren = blocks.map((block) => {
    if (block.has_children && !block[block.type].children) {
      block[block.type]['children'] = childBlocks.find(x => x.id === block.id)?.children
    }
    return block
  })
  .reduce((acc, item: any) => {
    const isListItem =
        item.type === 'bulleted_list_item' || item.type === 'numbered_list_item';

    if (isListItem) {
        const lastItem = acc[acc.length - 1];

        if (lastItem?.type === 'bulleted_list' || lastItem?.type === 'numbered_list') {
            lastItem[lastItem.type].children.results.push(item);
            return acc;
        }

        const type = item.type === 'bulleted_list_item' ? 'bulleted_list' : 'numbered_list';
        const newItem = {
            type,
            object: 'block',
            has_children: 'true',
            [type]: { children: { results: [item] } }
        };

        return [...acc, newItem];
    }

    return [...acc, item];
  }, [])

  // Resolve all images' dimensions
  await Promise.all(
    blocksWithChildren
      .filter((b: any) => b.type === 'image')
      .map(async (b: { [x: string]: any; type?: any }) => {
        const { type } = b
        const value = b[type]
        const src = value.type === 'external' ? value.external.url : value.file.url

        const { width, height } = await probeImageSize(src)
        value['dim'] = { width, height }
        b[type] = value
      })
  )

  // return { props: { page, blocks: blocksWithChildren }, revalidate: 1 }
  return { props: { page, blocks: blocksWithChildren } }
}

export default Post
