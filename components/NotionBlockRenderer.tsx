import { Fragment } from 'react'
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nord } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import Latex from 'react-latex-next'

import { Text } from './blocks/NotionTextBlock'
import Table from './blocks/NotionTable'
import Bookmark from './blocks/NotionBookmark'
import { slugify } from 'transliteration'
import NotionImage, { getMediaCtx } from './blocks/NotionImage'

export const renderNotionBlock = (block: any): JSX.Element => {
  const { type, id, has_children } = block
  const value = block[type]

  switch (type) {
    case 'paragraph':
      return (
        <p className="my-2">
          {<Text text={value.text} />}
        </p>
      )

    case 'heading_1':
      return (
        <h1 id={slugify(value.text[0].plain_text)} className="font-bold mt-4 mb-2 text-2xl leading-7 dark:text-white">
          <Text text={value.text} />
        </h1>
      )

    case 'heading_2':
      return (
        <h2 id={slugify(value.text[0].plain_text)} className="font-bold mt-4 text-xl mb-2 leading-7 dark:text-white">
          <Text text={value.text} />
        </h2>
      )

    case 'heading_3':
      return (
        <h3 id={slugify(value.text[0].plain_text)} className="font-bold mt-4 text-lg mb-2 leading-7 dark:text-white">
          <Text text={value.text} />
        </h3>
      )

    case 'bulleted_list':
      return <ul className="list-disc list-inside my-1">{(block[type].children.results).map((child: any) => renderNotionBlock(child))}</ul>
  
    case 'numbered_list':
      return <ol className="list-decimal list-inside my-1">{(block[type].children.results).map((child: any) => renderNotionBlock(child))}</ol>

    case 'bulleted_list_item':
      return (
        <li>
          <Text text={value.text} />
          {has_children ? (
            <ul className="list-disc list-inside mx-5 my-1">{(block[type].children|| []).map((child: any) => renderNotionBlock(child))}</ul>
          ) : null}
        </li>
      )

    case 'numbered_list_item':
      return (
        <li>
          <Text text={value.text} />
          {has_children ? (
            <ol className="list-decimal list-inside mx-5 my-1">{(block[type].children || []).map((child: any) => renderNotionBlock(child))}</ol>
          ) : null}
        </li>
      )

    case 'to_do':
      return (
        <div>
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} /> <Text text={value.text} />
          </label>
        </div>
      )

    case 'toggle':
      return (
        <details>
          <summary>
            <Text text={value.text} />
          </summary>
          {value.children?.map((block: any) => (
            <Fragment key={block.id}>{renderNotionBlock(block)}</Fragment>
          ))}
        </details>
      )

    case 'child_page':
      return <p className="my-2">{value.title}</p>

    case 'image':
      return <NotionImage value={value} />

    case 'video':
      const { src: videoSrc, caption: videoCaption } = getMediaCtx(value)
      return (
        <div className="rounded my-2 overflow-hidden">
          <video src={videoSrc} controls />
          <p className="my-2 text-center opacity-80">{videoCaption}</p>
        </div>
      )

    case 'divider':
      return <p className="font-mono text-center py-2 tracking-[1em]">...</p>

    case 'quote':
      return (
        <p className="rounded bg-light-300 border-l-2 my-2 p-2 pl-4 dark:bg-dark-600">
          <Text text={value.text} />
        </p>
      )

    case 'callout':
      return (
        <p className="rounded flex space-x-2 bg-light-300 border-l-2 my-2 p-2 pl-4 dark:bg-dark-600">
          <span>{value.icon.emoji}</span>
          <div>
            <Text text={value.text} />
          </div>
        </p>
      )

    case 'bookmark':
      return <Bookmark value={value} />

    case 'code':
      return (
        <div className="rounded my-2 overflow-hidden">
          <div className="font-mono bg-[#2e3440] text-right text-xs w-full opacity-90 py-1 px-2 text-light-50">
            {value.language}
          </div>
          <pre className="font-mono text-sm overflow-hidden">
            <SyntaxHighlighter language={value.language} style={nord} showLineNumbers={true}>
              {value.text[0].plain_text}
            </SyntaxHighlighter>
          </pre>
        </div>
      )

    case 'equation':
      return <Latex>{`\\[${value.expression}\\]`}</Latex>

    case 'table':
      return (
        <table className='w-full table-auto'>
          {value.children?.map((block: any) => (
            <Fragment key = {block.id}>{renderNotionBlock(block)}</Fragment>
          ))}
        </table>
      )

    case 'table_row':
      return (
        <tr className='p-2 bg-light-300 dark:bg-dark-600'>
          <Table table = {value.cells} />
        </tr>
      )

    default:
      return <p>`❌ Unsupported block (${type === 'unsupported' ? 'unsupported by Notion API' : type})`</p>
  }
}
