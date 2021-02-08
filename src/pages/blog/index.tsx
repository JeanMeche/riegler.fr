import Layout from '../../components/Layout/Layout'
import { getPosts, Post } from '../../api';
import PostItem from '../../components/Post/Index';
import { GetStaticProps, NextPage } from 'next';

const IndexPage: NextPage<{ posts: Post[] }> = ({ posts }) => (
    <Layout title="Blog">
        <ul>
            {posts.map(p => (
                <PostItem key={p.title} post={p} />
            ))}
        </ul>
    </Layout>
)

export const getStaticProps: GetStaticProps = async () => {
    const posts = await getPosts();
    return {
        props: { posts }
    }
}

export default IndexPage