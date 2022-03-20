import { Feed } from 'feed'
import { GetServerSideProps } from 'next'
import { getBlogDatabase } from '../lib/notion'

const domain = 'https://article.hurleywong.com'
const year = new Date().getFullYear()

// Function for generating the RSS feed
const generateRSS = (posts: any) => {
  // Create new feed object
  const feed = new Feed({
    id: domain,
    link: domain,
    title: "Hurley's Homepage",
    description: 'Thoughts, ideas, and more.',
    copyright: `All rights reserved ${year}, Hurley Wong`,
    image: `${domain}/favicon.png`,
    favicon: `${domain}/favicon.ico`,
    author: {
      name: 'Hurley Wong',
      email: 'hurleyhuang@hotmail.com',
      link: 'https://hurleywong.com',
    },
  })

  // Add posts to feed based on queried data from Notion
  posts.forEach((post: any) => {
    feed.addItem({
      title: post.properties.name.title[0].text.content,
      id: post.id,
      link: `${domain}/blog/${post.properties.slug.rich_text[0].text.content}`,
      description: post.properties.preview.rich_text[0].text.content,
      date: new Date(post.properties.date.date.start),
    })
  })

  return feed.rss2()
}

// Dummy component as Next.js must have a component to render
const FeedComponent = () => null

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Cache-Control', 'max-age=0, s-maxage=60, stale-while-revalidate')

  const posts = await getBlogDatabase()
  const xmlFeed = generateRSS(posts)

  res.setHeader('Content-Type', 'text/xml')
  res.write(xmlFeed)
  res.end()

  return {
    props: {},
  }
}

export default FeedComponent
