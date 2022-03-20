import { Book, Cloud, Code, Box, User, Icon, Users } from 'react-feather'

export interface SiteProps {
  name: string
  link: string
  intro: string
  color: string
  icon: Icon
}

export const siteLinks: SiteProps[] = [
  {
    name: 'Notes',
    link: 'https://notes.hurleywong.com',
    intro: 'Hurley\'s 阅读实战笔记',
    color: '#57dcff',
    icon: Book,
  },
  {
    name: 'Soul',
    link: 'https://soul.hurleywong.com',
    intro: 'Hurley\'s 心灵树洞',
    color: '#557aff',
    icon: User,
  },
  {
    name: 'Interview',
    link: 'https://interview.hurleywong.com',
    intro: '技术岗校招面经（Android/Java 方向）',
    color: '#297abd',
    icon: Users,
  },
  {
    name: 'RTFSC',
    link: 'https://rtfsc.hurleywong.com',
    intro: 'Java JDK 源码笔记',
    color: '#3eaf7c',
    icon: Code,
  },
  {
    name: 'Bank',
    link: 'https://bank.hurleywong.com',
    intro: '银行小课堂',
    color: '#000000',
    icon: Box,
  },
]
