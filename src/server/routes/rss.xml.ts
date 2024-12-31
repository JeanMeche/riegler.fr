import fm from 'front-matter';
import * as fs from 'fs';
import {defineEventHandler} from 'h3';
import * as path from 'path';
import RSS from 'rss';
import {ContentMetadata} from 'src/lib/content-metadata/content-metadata';
const posts = fs.readdirSync('./src/content/posts').filter((file) => file.endsWith('.md'));

async function generateRssFeed() {
  const site_url = 'https://riegler.fr';

  const feedOptions = {
    title: `Matthieu Riegler's Blog | RSS Feed`,
    description: 'Notes',
    site_url: site_url,
    feed_url: `${site_url}/api/rss.xml`,
    image_url: `${site_url}/me.png`,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}`,
  };

  const feed = new RSS(feedOptions);

  posts
    .map((postFile) => {
      const fileContents = fs.readFileSync(
        path.resolve(`src/content/posts/${postFile}`, postFile + '.md'),
        'utf8',
      );
      return {attributes: fm(fileContents).attributes as ContentMetadata, slug: postFile};
    })
    .sort((a1, a2) => ((a1.attributes as any).date > (a2.attributes as any).date ? -1 : 1))
    .forEach(({attributes, slug}) => {
      feed.item({
        title: attributes.title,
        description: attributes.excerpt,
        url: `${site_url}/blog/${slug}`,
        date: attributes.date,
      });
    });

  return feed.xml({indent: true});
}

export default defineEventHandler(async (event) => {
  const feedString = await generateRssFeed();
  event.node.res.setHeader('content-type', 'text/xml');
  event.node.res.end(feedString);
});
