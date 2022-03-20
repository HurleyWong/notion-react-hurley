import { FC } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import useSWR from 'swr'
import { ExternalLink } from 'react-feather'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import { projectLinks, ProjectProps } from '../config/project'
import { socialLinks, LinkProps } from '../config/link'
import { siteLinks, SiteProps } from '../config/site'

const fetcher = (url: string) => fetch(url).then(res => res.json())

const LinkFollowerText: FC<{ apiUrl: string; followerName: string }> = ({ apiUrl, followerName }) => {
  const { data, error } = useSWR(apiUrl, fetcher)

  if (error) return <div className="font-mono text-sm">failed to load</div>
  if (!data) return <div className="font-mono text-sm">loading...</div>
  return (
    <div className="font-mono text-sm">
      {data.data.totalSubs} {followerName}
    </div>
  )
}

const LinkCard: FC<LinkProps> = props => {  
  const pronoun = props.followerName ? props.followerName : 'followers'

  return (
    <a
      className="border-b-0 rounded bg-light-300 p-4 relative overflow-hidden dark:bg-dark-700 border-l-4"
      href={props.link}
      target="_blank"
      rel="noopener noreferrer"
      style={{ borderLeftColor: props.color }}
    >
      <p className="flex items-center justify-between hover:opacity-80">
        <div>
          <div className="font-bold">{props.name}</div>
          <LinkFollowerText apiUrl={props.apiUrl} followerName={pronoun} />
        </div>
        {props.icon ? (
          <props.icon size={18} className="opacity-70" />
        ) : (
          <ExternalLink size={18} className="opacity-70" />
        )}
      </p>
    </a>
  )
}

const ProjectCard: FC<ProjectProps> = props => {
  return (
    <a
      href={props.link}
      className="border-b-0 rounded bg-light-300 p-4 dark:bg-dark-700 border-l-4"
      target="_blank"
      rel="noopener noreferrer"
      style={{ borderLeftColor: props.color }}
    >
      <div className="flex space-x-4 transition-all duration-100 primary-text items-center justify-between hover:opacity-80">
        <div className="truncate">
          <div className="font-bold">{props.name}</div>
          <div className="font-mono text-sm">{props.slug}</div>
        </div>
        <props.icon size={24} className="flex-shrink-0" />
      </div>
    </a>
  )
}

// 网站链接
const SiteCard: FC<SiteProps> = props => {
  return (
    <a
      href={props.link}
      className="border-b-0 rounded bg-light-300 p-4 dark:bg-dark-700 border-l-4"
      target="_blank"
      rel="noopener noreferrer"
      style={{ borderLeftColor: props.color }}
    >
      <div className="flex space-x-4 transition-all duration-100 primary-text items-center justify-between hover:opacity-80">
        <div className="truncate">
          <div className="font-bold">{props.name}</div>
          <div className="font-mono text-sm">{props.intro}</div>
        </div>
        <props.icon size={24} className="flex-shrink-0" />
      </div>
    </a>
  )
}

const Links: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Hurley Wong - Links</title>
        <meta name="description" content="Spencer Woo" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </Head>

      <div className="flex flex-col min-h-screen dark:bg-dark-900">
        <Navbar />
        <main className="container flex flex-col mx-auto flex-1 max-w-3xl px-6">
          <h1 className="font-bold text-xl mb-8 heading-text">Projects</h1>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            {projectLinks.map((project: ProjectProps) => (
              <ProjectCard key={project.slug} {...project} />
            ))}
          </div>

          <h1 className="font-bold my-8 text-xl heading-text">Socials</h1>

          <div className="mb-8 grid gap-4 grid-cols-1 sm:grid-cols-2">
            {socialLinks.map((link: LinkProps) => (
              <LinkCard key={link.name} {...link} />
            ))}
          </div>

          <h1 className="font-bold my-8 text-xl heading-text">Websites</h1>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            {siteLinks.map((site: SiteProps) => (
              <SiteCard key={site.intro} {...site} />
            ))}
          </div>

          <br></br>

          <p className="font-mono text-xs text-center secondary-text">
            Powered by{' '}
            <a href="https://substats.spencerwoo.com" target="_blank" rel="noopener noreferrer">
              Substats
            </a>
            .
          </p>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Links
