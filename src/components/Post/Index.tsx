
import React, { FunctionComponent } from 'react'
import Link from 'next/link'
import { Post } from '../../api'

const PostItem: FunctionComponent<{ post: Post }> = ({ post }) => (
    <div>
        <Link href={{ pathname: `post/${post.id}` }}>
            <a>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
            </a>
        </Link>
    </div>
)

export default PostItem