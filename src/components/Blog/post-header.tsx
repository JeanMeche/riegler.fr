import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import PostTitle from './post-title'
import { Post } from '../../api/api'
import { FunctionComponent } from 'react'

type PostHeaderProps = Pick<Post, 'title' | 'coverImage' | 'date' >


const PostHeader: FunctionComponent<PostHeaderProps> = ({ title, coverImage, date }) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0 ">
        <CoverImage title={title} src={coverImage} height={620} width={1240} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 text-lg">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  )
}
export default PostHeader