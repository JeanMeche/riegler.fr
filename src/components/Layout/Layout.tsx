import Head from 'next/head'
import Footer from './Footer/Footer'
import Nav from './Nav/Nav'

export default function Layout({ children, title }: { children: React.ReactNode, title: string }): JSX.Element {
    return (<div>
        <Head>
            <title>{title}</title>
        </Head>
        <header>
            <Nav />
        </header>

        <main>
            {children}
        </main>

        <Footer>
            Footer
        </Footer>
    </div>)
}