import { Dispatch, FC, Fragment, SetStateAction, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import AwesomeDebouncePromise from 'awesome-debounce-promise'
import { useAsync } from 'react-async-hook'
import { Search } from 'react-feather'
import useConstant from 'use-constant'

import Link from 'next/link'
import Image from 'next/image'

const useNotionSearch = () => {
  const [query, setQuery] = useState('')
  const searchNotion = async (q: string) => {
    const result = await fetch(`/api/search/${q}`)
    return await result.json()
  }

  const debouncedNotionSearch = useConstant(() => AwesomeDebouncePromise(searchNotion, 1000))
  const results = useAsync(async () => {
    if (query.length === 0) {
      return []
    } else {
      return debouncedNotionSearch(query)
    }
  }, [query])

  return {
    query,
    setQuery,
    results,
  }
}

const SearchModal: FC<{
  searchOpen: boolean
  setSearchOpen: Dispatch<SetStateAction<boolean>>
}> = ({ searchOpen, setSearchOpen }) => {
  const closeSearchBox = () => setSearchOpen(false)

  const { query, setQuery, results } = useNotionSearch()

  return (
    <Transition appear show={searchOpen} as={Fragment}>
      <Dialog as="div" className="inset-0 z-10 fixed overflow-y-auto" onClose={closeSearchBox}>
        <div className="min-h-screen text-center px-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="bg-light-200/30 inset-0 fixed backdrop-filter backdrop-blur dark:bg-dark-200/30" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-100"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="border rounded border-gray-400/30 shadow-xl my-20 text-left w-full max-w-3xl transform transition-all inline-block overflow-hidden ">
              <Dialog.Title as="h3" className="relative primary-text">
                <div className="flex pl-3 inset-y-0 left-0 absolute items-center pointer-events-none">
                  <Search size={18} />
                </div>
                <input
                  type="text"
                  id="search-box"
                  className="border-b bg-gray-50 border-gray-400/30 w-full p-2.5 pt-4 pl-10 block dark:bg-dark-700 focus:outline-none focus-visible:outline-none"
                  placeholder="Search in blog posts..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                />
              </Dialog.Title>

              <div className="bg-white primary-text dark:bg-dark-800">
                {results.loading && (
                  <div className="text-center">
                    <div className="animate-pulse">
                      <Image src="/images/purr-sleep.png" alt="purr loading" width={300} height={300} />
                    </div>
                    <div className="pb-4 secondary-text">Loading ...</div>
                  </div>
                )}
                {results.error && (
                  <div className="text-center">
                    <Image src="/images/error-result.png" alt="errored out" width={450} height={300} />
                    <div className="pb-4 secondary-text">Error: {results.error.message}</div>
                  </div>
                )}
                {results.result && (
                  <>
                    {results.result.length === 0 ? (
                      <div className="text-center">
                        <Image src="/images/empty-list.png" alt="empty list" width={300} height={300} />
                        <div className="pb-4 secondary-text">Nothing here...</div>
                      </div>
                    ) : (
                      results.result.map((result: any, i: number) => (
                        <Link href={`/blog/${result.properties.slug.rich_text[0].plain_text}`} key={i} passHref>
                          <a className="border-b cursor-pointer flex border-gray-400/30 p-4 justify-between hover:bg-light-200 dark:hover:bg-dark-700">
                            <div className="w-9">{result.icon.emoji}</div>
                            <div className="flex-1 overflow-hidden truncate">
                              <div className="font-medium pb-1">{result.properties.name.title[0].text.content}</div>
                              <div className="pb-1 secondary-text">
                                {result.properties.preview.rich_text[0].plain_text}
                              </div>
                              <div className="font-mono text-xs secondary-text">
                                {result.properties.date.date.start}
                              </div>
                            </div>
                          </a>
                        </Link>
                      ))
                    )}
                  </>
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default SearchModal
