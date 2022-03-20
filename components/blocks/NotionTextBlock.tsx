import Latex from 'react-latex-next'

export function Text({ text }: { text: any }) {
  if (!text) {
    return null
  }
  return text.map((value: any, index: number) => {
    const {
      annotations: { bold, code, color, italic, strikethrough, underline },
      text,
      equation,
    } = value
    equation ? console.log(equation.expression) : console.log()
    return (
      <span
        key={index}
        className={[
          bold ? 'font-bold' : '',
          code ? 'font-mono text-sm px-1 text-sky-500 dark:text-sky-400 bg-sky-300/20 dark:bg-sky-800/30 rounded' : '',
          italic ? 'italic' : '',
          strikethrough ? 'line-through' : '',
          underline ? 'underline' : '',
        ].join(' ')}
        style={color !== 'default' ? { color } : {}}
      >
        { equation ? <Latex>{`$${equation.expression}$`}</Latex> : (text.link ? (
          <a href={text.link.url} target="_blank" rel="noopener noreferrer">
          {text.content}
          </a>
        ) : (text.content))
        }
      </span>
    )
  })
  
}
