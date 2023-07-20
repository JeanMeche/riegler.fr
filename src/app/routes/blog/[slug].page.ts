import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import AnalogContentDirective from '../../../lib/front-matter/analog-content.directive';

@Component({
  selector: 'blog-post',
  standalone: true,
  imports: [DatePipe, RouterLink, AnalogContentDirective],
  template: `
    <article
      *analogContent="let meta = metadata; let content = content"
      class="z-10"
    >
      <img
        class="w-full right-0 top-0 object-cover article-cove rounded-lg"
        [src]="meta.coverImage"
      />
      <header class="flex flex-col">
        <h1
          class="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl"
        >
          {{ meta.title }}
        </h1>
        <time
          [attr.datetime]="meta.date | date"
          class="order-first flex items-center text-base text-blue-500"
        >
          {{ meta.date | date }}</time
        >
      </header>
      <div
        class="pt-8 !max-w-screen-lg sm:pt-12 prose dark:prose-invert"
        [innerHTML]="content"
      ></div>
    </article>
  `,
})
export default class BlogPostComponent {}
