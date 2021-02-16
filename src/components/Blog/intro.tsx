import { FunctionComponent } from 'react'

const Intro:FunctionComponent = () =>  {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        Blog.
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        Sharing is caring <span role="img" aria-label="heart emoji">❤️</span>
      </h4>
    </section>
  )
}
export default Intro