import * as fs from 'fs';
import * as path from 'path';

export function getBlogPosts() {
  const posts = fs
    .readdirSync('./src/content')
    .map((file: string) => `/blog/${path.parse(file).name}`);
  console.log(posts);
  return posts;
}
