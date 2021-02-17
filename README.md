This is the repository for my personal site [**Riegler.fr**](https://riegler.fr)


## Technology used

* It uses the Static Site Generator (SSG) [Next.js](https://nextjs.org/)
* It uses the [TailWindCSS](https://tailwindcss.com/) framework, [PostCSS](https://postcss.org/) and CSS Modules
* Blog articles are written in `Markdown` and converted to HTML using [remark-html](https://github.com/remarkjs/remark-html). Metadata are extracted with [gray-matter](https://github.com/jonschlinkert/gray-matter)


## Dev, build & deploy

* ```npm run dev``` to run as Server Side rendering
* ```npm run build```to build the app as a static site (SSG) and export to ```/out````
* ```npm run serve-build``` to start http-server to serve the built site at ```127.0.0.1:8080```
