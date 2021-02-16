import Footer from './footer'
import Meta from './meta'
import { FunctionComponent } from 'react'

const Layout: FunctionComponent = (props) => {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <main>{props.children}</main>
      </div>
      <Footer />
    </>
  )
}
export default Layout;