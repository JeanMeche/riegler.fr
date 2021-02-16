import cn from 'classnames'
import Link from 'next/link'
import { FunctionComponent } from 'react'

interface CoverImageProps { title: string, src: string, slug?: string, height: number, width: number }

const CoverImage: FunctionComponent<CoverImageProps> = ({ title, src, slug, height, width }) => {
  const image = (
    <div style={{ position: 'relative', height: height+'px' }}>
      <img
        src={require(`../../../public/${src}`)}
        alt={`Cover for ${title}`}
        className={cn('shadow-sm', 'cover-image', {
          'hover:shadow-md transition-shadow duration-200': slug,
        })}
        style={{objectFit:"cover", minWidth: '100%', maxWidth: '100%', minHeight: '100%', maxHeight: '100', width: 0, height: 0}}
      />
    </div>
  )
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
          image
        )}
    </div>
  )
}

export default CoverImage;
