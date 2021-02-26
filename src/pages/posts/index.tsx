import Container from '../../components/Blog/container'
import MoreStories from '../../components/Blog/more-stories'
import HeroPost from '../../components/Blog/hero-post'
import Intro from '../../components/Blog/intro'
import Strava from '../../components/Strava/Strava'
import Layout from '../../components/Blog/layout'
import { getAllPosts, Post } from '../../api/api'
import Head from 'next/head'

export default function Index({ allPosts }: { allPosts: Post[] }): JSX.Element {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  return (
    <>
      <Layout>
        <Head>
          <title>Blog | Riegler.fr</title>
        </Head>
        <Container>
          <Intro />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          <section>
            <Strava ></Strava>
          </section>
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'coverImage',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}
