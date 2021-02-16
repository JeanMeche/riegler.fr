import { FunctionComponent } from 'react'

const Container: FunctionComponent = ({ children }) => {
  return <div className="container mx-auto px-5">{children}</div>
}

export default Container