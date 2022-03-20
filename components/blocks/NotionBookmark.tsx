import { Link } from 'react-feather'
import useSWR from 'swr'

const previewFetcher = (url: string) => fetch(`/api/bookmark/${encodeURIComponent(url)}`).then(res => res.json())

const Bookmark = ({ value }: { value: any }) => {
  const { url } = value
  const { data, error } = useSWR(url, previewFetcher)

  if (error)
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="border-none rounded flex space-x-2 p-2 text-gray-600 items-center dark:text-gray-400 hover:bg-light-200 dark:hover:bg-dark-700"
      >
        <Link size={16} />
        <span className="truncate overflow-hidden">{url}</span>
      </a>
    )

  if (!data)
    return (
      <div
        className="border rounded cursor-pointer flex border-gray-400/50 max-h-30 text-gray-600 dark:text-gray-400 hover:bg-light-200 dark:hover:bg-dark-700"
        onClick={() => {
          window.open(url)
        }}
      >
        <div className="flex flex-col flex-shrink space-y-2 flex-1 p-2">
          <div className="rounded bg-gray-200 h-5 max-w-40 animate-pulse dark:bg-dark-400" />
          <div className="rounded bg-gray-200 flex-1 animate-pulse dark:bg-dark-400" />
          <p className="flex space-x-2 text-sm opacity-70 overflow-hidden">
            <Link size={16} />
            <span className="flex-shrink-0">{url}</span>
          </p>
        </div>
        <div className="bg-gray-200 flex-shrink-0 h-30 animate-pulse w-60 overflow-hidden hidden sm:block dark:bg-dark-400" />
      </div>
    )

  const { title, description, favicon, open_graph } = data
  const images = open_graph?.images ?? []

  return (
    <div
      className="border rounded cursor-pointer flex border-gray-400/50 my-1 max-h-28 primary-text justify-between hover:bg-light-200 dark:hover:bg-dark-700"
      onClick={() => {
        window.open(url)
      }}
    >
      <div className="flex flex-col flex-shrink p-2 overflow-hidden">
        <p className="font-bold h-6 text-sm mb-1 leading-6 truncate">{title}</p>
        <p className="h-10 text-sm text-ellipsis mb-1 opacity-80 leading-5 overflow-hidden">{description}</p>
        <p className="flex space-x-2 h-6 text-sm opacity-70 items-center truncate overflow-hidden">
          {favicon ? <img src={favicon} className="h-4 w-4" alt="favicon" /> : <Link size={17} />}
          <span className="transform leading-6 translate-y-0.5 truncate overflow-hidden">{url}</span>
        </p>
      </div>
      {images && images.length > 0 && (
        <div className="flex-shrink-0 h-28 max-w-60 border-l overflow-hidden hidden sm:block">
          <img src={images[0].url} alt={title} className="rounded object-cover border-gray-400/50 h-27.5" />
        </div>
      )}
    </div>
  )
}

export default Bookmark
