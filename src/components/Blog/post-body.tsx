import { ElementType } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import markdownStyles from './markdown-styles.module.css'

const components: { [nodeType: string]: ElementType } = {
  image: function image(image: HTMLImageElement) {
    const imgSrc = require(`../../../public/${image.src}?sizes[]=300,sizes[]=600`);
    return <img srcSet={imgSrc.srcSet} alt={image.alt} height="200" width="355" /> as JSX.Element
  },
}

export default function PostBody({ content }: { content: string }): JSX.Element {
  return (
    <div className="max-w-2xl mx-auto">
      <ReactMarkdown plugins={[remarkGfm]} className={markdownStyles["markdown"]} components={components} >
        {content}
      </ReactMarkdown>
    </div>
  )
}
