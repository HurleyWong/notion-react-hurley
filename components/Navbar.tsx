import Link from 'next/link'
import { Menu, Transition } from '@headlessui/react'
import { Menu as MenuIcon, Rss } from 'react-feather'
import { Fragment } from 'react'
// import Toggle from './DarkToggle'

const navigations = [
  {
    name: 'Blog',
    link: '/blog',
  },
  {
    name: 'Notes',
    link: '/notes',
  },
  {
    name: 'Article',
    link: '/article',
  },
  {
    name: 'Academic',
    link: '/academic',
  },
  {
    name: 'Links',
    link: '/links',
  },
  // {
  //   name: 'Friends',
  //   link: '/friends',
  // },
]

const MenuItemLink = (props: { [x: string]: any; href: any; children: any }) => {
  const { href, children, ...rest } = props
  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  )
}

const Navbar = () => {
  return (
    <header className="flex p-6 z-10 items-center justify-between primary-text">
      <Link href="/" passHref>
        <a>Hurley</a>
      </Link>
      <div className="flex space-x-4 items-center">
        <nav className="flex space-x-4 items-center hidden sm:block">
          {navigations.map((n, i) => (
            <Link href={n.link} key={i} passHref>
              <a>{n.name}</a>
            </Link>
          ))}
        </nav>

        <div className="block sm:hidden">
          <Menu as="div" className="text-left relative">
            <Menu.Button className="flex text-current items-center">
              <MenuIcon size={20} />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Menu.Items className="bg-white rounded shadow-lg mt-2 origin-top-right right-0 shadow-gray-600 ring-0 w-32 absolute mobile-menu dark:(bg-dark-700)">
                {navigations.map((n, i) => (
                  <div className="p-2" key={i}>
                    <Menu.Item>
                      <MenuItemLink href={n.link}>{n.name}</MenuItemLink>
                    </Menu.Item>
                  </div>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>

        <div
          onClick={() => {
            window.open('/feed')
          }}
          className="cursor-pointer hover:text-gray-500"
        >
          <Rss size={20} />
        </div>
        {/* <Toggle /> */}
      </div>
    </header>
  )
}

export default Navbar
