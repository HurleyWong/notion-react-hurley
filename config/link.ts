import { Rss, Github, Props, Telegram, Twitter, Sinaweibo, Steam, Medium } from '@icons-pack/react-simple-icons'
import { FC } from 'react'

export interface LinkProps {
  name: string
  link: string
  icon?: FC<Props>
  apiUrl: string
  color: string
  followerName?: string
}

export const socialLinks: LinkProps[] = [
  {
    name: 'GitHub',
    link: 'https://github.com/HurleyWong',
    icon: Github,
    apiUrl: 'https://api.spencerwoo.com/substats/?source=github&queryKey=HurleyWong',
    color: '#24292f',
  },
  {
    name: 'Twitter',
    link: 'https://twitter.com/HurleyHuang23',
    icon: Twitter,
    apiUrl: 'https://api.spencerwoo.com/substats/?source=twitter&queryKey=HurleyHuang23',
    color: '#1da1f2',
  },
  {
    name: 'Weibo',
    link: 'https://weibo.com/5628559861',
    icon: Sinaweibo,
    apiUrl: 'https://api.spencerwoo.com/substats/?source=weibo&queryKey=5628559861',
    color: '#e71f19',
  },
]
