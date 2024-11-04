import { injectContent, MarkdownComponent } from '@analogjs/content';
import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';

export interface PostAttributes {
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  date: Date;
}

@Component({
  standalone: true,
  imports: [MarkdownComponent, AsyncPipe, NgIf],
  template: `
    <article *ngIf="post$ | async as post" class="z-10">
      <header class="w-full h-[320px] right-0 top-0 flex justify-end relative">
        <img
          class="h-full right-0 top-0 rounded-lg"
          [src]="post.attributes.coverImage"
        />
        <div
          class="w-[60%] h-full left-0 top-0 absolute bg-gradient-to-r dark:from-zinc-800 from-white from-70% pr-[20%] flex flex-col justify-center"
        >
          <p class="text-3xl font-bold">{{ post.attributes.title }}</p>
        </div>
      </header>
      <div class="pt-8 !max-w-screen-lg sm:pt-12 prose dark:prose-invert">
        <analog-markdown [content]="post.content"></analog-markdown>
      </div>
    </article>
  `,
})
export default class ProjectComponent {
  readonly post$ = injectContent<PostAttributes>({
    customFilename: 'talks/talks',
  });
}
