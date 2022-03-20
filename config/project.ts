import { Phone, BookOpen, Cloud, Code, FileText, Image, Icon, Rss } from 'react-feather'

export interface ProjectProps {
  name: string
  link: string
  slug: string
  color: string
  icon: Icon
}

export const projectLinks: ProjectProps[] = [
  {
    name: 'CodeHub',
    link: 'https://github.com/HurleyWong/CodeHub',
    slug: 'WanAndroid 第三方开源项目',
    color: '#05a9f5',
    icon: Phone,
  },
  {
    name: 'NCHU_Bachelor_Thesis_Template',
    link: 'https://github.com/NCHUSC/NCHU_Bachelor_Thesis_Template',
    slug: '南昌航空大学（非官方）本科生毕业论文模板',
    color: '#00527b',
    icon: FileText,
  },
  {
    name: 'Computer-English-Words',
    link: 'https://github.com/HurleyWong/Computer-English-Words',
    slug: '计算机专业术语英文词汇',
    color: '#fd514c',
    icon: BookOpen,
  },
  {
    name: 'macOS-Big-Sur-icon-collection',
    link: 'https://github.com/HurleyWong/macOS-Big-Sur-icon-collection',
    slug: 'macOS Big Sur 风格圆角图标集合',
    color: '#3672a5',
    icon: Image,
  },
]
