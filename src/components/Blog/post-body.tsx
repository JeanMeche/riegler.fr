import { CSSProperties, ElementType } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import remarkBreaks from 'remark-breaks';
import rehypeHighlight from 'rehype-highlight';

import 'highlight.js/styles/base16/solarized-dark.css';
import markdownStyles from './markdown-styles.module.css';

const components: { [nodeType: string]: ElementType } = {
  image: (image: HTMLImageElement) => {
    const imgSrc = require(`../../../public/${image.src}?sizes[]=300,sizes[]=600`);
    return (
      <img srcSet={imgSrc.srcSet} alt={image.alt} height="200" width="355" />
    ) as JSX.Element;
  },
  table: (table: HTMLTableElement) => {
    return (
      <table className="table-auto shadow-lg bg-white rounded-lg w-full">
        {table.children}
      </table>
    );
  },
  td: (td: HTMLTableCellElement) => {
    const { children, style } = td;
    const styles = style as CSSProperties;
    return (
      <td style={styles} className="border px-8 py-4">
        {children}
      </td>
    );
  },
  code: (code: HTMLElement) => {
    return (
      <code className={`${code.className} rounded-lg text-sm`}>{code.children}</code>
    );
  },
};

export default function PostBody({
  content,
}: {
  content: string;
}): JSX.Element {
  return (
    <div className="max-w-4xl mx-auto">
      <ReactMarkdown
        // @ts-expect-error see https://github.com/rehypejs/rehype/discussions/63
        remarkPlugins={[remarkBreaks, remarkGfm]}
        // @ts-expect-error see https://github.com/remarkjs/remark-rehype/issues/16
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        className={markdownStyles['markdown']}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
