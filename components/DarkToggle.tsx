import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'react-feather'

const Toggle = () => {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  const { asPath } = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  // do not render theme toggle if not on home page or if not mounted
  if (!mounted || asPath === '/') return null

  return (
    <button
      onClick={() => {
        setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
      }}
      className="cursor-pointer inline-flex items-center hover:text-gray-500"
    >
      {resolvedTheme === 'light' ? <Moon className="inline" size={20} /> : <Sun className="inline" size={20} />}
    </button>
  )
}

export default Toggle
