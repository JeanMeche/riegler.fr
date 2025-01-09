import {injectContent, injectContentFiles} from '@analogjs/content';
import { AsyncPipe, DatePipe } from '@angular/common';
import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs';
import {ContentMetadata} from '../../../lib/content-metadata/content-metadata';
import AnalogContentDirective from '../../../lib/front-matter/analog-content.directive';
import {BlogPreviewComponent} from '../../components/blog/blog-preview/blog-preview.component';
import {TableOfContentsComponent} from '../../components/blog/table-of-content/table-of-contents.component';

@Component({
  selector: 'blog-post',
  standalone: true,
  imports: [
    DatePipe,
    AsyncPipe,
    AnalogContentDirective,
    TableOfContentsComponent,
    BlogPreviewComponent
],
  template: `
    <article
      *analogContent="let meta = metadata; let content = content; let headings = headings"
      class="z-10"
      >
      <app-blog-toc [headings]="headings"></app-blog-toc>
      <header class="w-full h-[320px] right-0 top-0 flex justify-end relative">
        <img class="h-full right-0 top-0 rounded-lg" [src]="meta.coverImage" />
        <div
          class="w-[60%] h-full left-0 top-0 absolute bg-gradient-to-r dark:from-zinc-800 from-white from-70% pr-[20%] flex flex-col justify-around"
          >
          <div>
            <p class="text-3xl font-bold">{{ meta.title }}</p>
            <p class="text-sm text-zinc-800 dark:text-zinc-400 mt-2">{{ meta.excerpt }}</p>
          </div>
          <p class="text-sm mt-4">
            Matthieu Riegler -
            <time [attr.datetime]="meta.date | date" class="mt-4 text-sm">
              {{ meta.date | date }}
            </time>
          </p>
        </div>
      </header>
      <!-- Keeping an alternative header -->
      <!-- <header class="flex flex-col">
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
      </header> -->
      <div
        class="pt-8 !max-w-screen-lg sm:pt-12 prose dark:prose-invert"
        [innerHTML]="content"
      ></div>
    </article>
    
    <hr class="mt-24 border-zinc-100 dark:border-zinc-700/40" />
    <section>
      <h2 class="mt-4 text-2xl">Suggestions</h2>
      <div class="flex">
        @for (article of previousArticles$ | async; track article) {
          <div
            class="flex-1 mt-12 flex max-w-3xl flex-col space-y-16"
            >
            <app-blog-preview [article]="article" [showDate]="false" />
          </div>
        }
      </div>
    </section>
    `,
})
export default class BlogPostComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly files = injectContentFiles<ContentMetadata>((contentFile) =>
    contentFile.filename.includes('/src/content/posts'),
  );

  readonly previousArticles$ = injectContent<ContentMetadata>({
    param: 'slug',
    subdirectory: `posts/${this.route.snapshot.paramMap.get('slug')}`,
  }).pipe(
    map((currentArticle) => {
      return this.files
        .filter((article) => {
          return (
            currentArticle.attributes.title !== article.attributes.title &&
            new Date() > new Date(article.attributes.date)
          );
        })
        .sort((a1, a2) => (a1.attributes.date > a2.attributes.date ? -1 : 1))
        .slice(0, 2);
    }),
  );
}
