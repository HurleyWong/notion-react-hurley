import { Googleanalytics, Nextdotjs, Notion, Tailwindcss, Vercel } from '@icons-pack/react-simple-icons'

const Footer = () => {
  return (
    <footer className="text-xs text-center p-6 primary-text">
      <div className="space-x-2 inline-flex items-center my-2">
        <Notion size={16} />
        <Nextdotjs size={16} />
        <Vercel size={16} />
      </div>
      <div>Built with love by Hurley Wong</div>
      <div>
        <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer">
          CC BY-NC-SA 4.0
        </a>{' '}
        ©️ 2019 - {new Date().getFullYear()}
      </div>
    </footer>
  )
}

export default Footer
