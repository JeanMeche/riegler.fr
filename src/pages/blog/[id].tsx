import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import React from 'react'
import { getPostById, getPosts, Post } from '../../api'
import Layout from '../../components/Layout/Layout'

const PostPage: NextPage<{ post: Post }> = ({ post }) => (
    <Layout title="bla">
        <h1>{post.title}</h1>
        <p>{post.body}</p>
    </Layout>
)

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const post = await getPostById(params!.id as string)
    return {
        props: { post }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const postsParams = await getPosts().then((posts) => posts.map((post) => ({ params: { id: `${post.id}` } })))
    return { paths: postsParams, fallback: false };
}

export default PostPage