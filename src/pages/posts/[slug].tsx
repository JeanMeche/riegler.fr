import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/Blog/container'
import PostBody from '../../components/Blog/post-body'
import Header from '../../components/Blog/header'
import PostHeader from '../../components/Blog/post-header'
import Layout from '../../components/Blog/layout'
import { getPostBySlug, getAllPosts, Post } from '../../api/api'
import PostTitle from '../../components/Blog/post-title'
import Head from 'next/head'
import markdownToHtml from '../../api/markdownToHtml'
import { FunctionComponent } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'

interface PostProps {
  post: Post, morePosts: Post[], preview: boolean
}

const PostCmp: FunctionComponent<PostProps> = ({ post, morePosts, preview }) => {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
            <>
              <article className="mb-32">
                <Head>
                  <title>
                    {post.title} | Riegler.fr
                  </title>
                  <meta property="og:image" content={post.ogImage.url} />
                </Head>
                <PostHeader
                  title={post.title}
                  coverImage={post.coverImage}
                  date={post.date}
                />
                <PostBody content={post.content} />
              </article>
            </>
          )}
      </Container>
    </Layout>
  )
}

export default PostCmp;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = getPostBySlug(params?.slug as string, [
    'title',
    'date',
    'slug',
    'content',
    'ogImage',
    'coverImage',
  ])
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
