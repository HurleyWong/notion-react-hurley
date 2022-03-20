import Image from 'next/image'
import { Mail } from 'react-feather'

const Main = () => {
  return (
    <main className="container flex flex-col mx-auto flex-1 max-w-3xl px-6 justify-center">
      <div className="mb-2">
        <Image
          className="rounded-full transition-all duration-100"
          src="/images/avatar.jpg"
          alt="avatar"
          width={120}
          height={120}
          priority
        />
      </div>
      <h1 className="font-bold mb-8 text-2xl heading-text">Hurley Wong</h1>

      <p className="mb-8">
        Developer / Data Scientist / Banker
      </p>

      <p>
        Postgrad at the{' '}
        <a href="https://www.leeds.ac.uk/" target="_blank" rel="noopener noreferrer">
          University of Leeds
        </a>{' '}
        in Advanced Computing Science(AI). 
        
      </p>

      <p>
        Fields of interest: 🤓 Mobile Dev / 😏 Data Dev / 🧐 Front|Back-end Dev / 😅 ML.
      </p>

      <p className="mt-8">
        Most of my open-source projects can be found on{' '}
        <a href="https://github.com/HurleyWong" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        .
      </p>
      <p className="flex space-x-2 items-center">
        <Mail size={15} />
        <a href="mailto:hurleyhuang@hotmail.com">hurleyhuang@hotmail.com</a>
      </p>
    </main>
  )
}

export default Main
