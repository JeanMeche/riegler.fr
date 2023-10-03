import {injectContentFiles} from '@analogjs/content';
import {AsyncPipe, NgForOf} from '@angular/common';
import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {ContentMetadata} from '../../lib/content-metadata/content-metadata';
import {FeaturedBlogPreviewComponent} from '../components/blog/featured-blog-preview/featured-blog-preview.component';
import {PageHeaderComponent} from '../components/layout/page-header/page-header.component';
import {StravaComponent} from '../components/strava/strava.component';

@Component({
  selector: 'home',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    FeaturedBlogPreviewComponent,
    AsyncPipe,
    NgForOf,
    PageHeaderComponent,
    StravaComponent,
  ],
  template: `
    <app-page-header
      title="Matthieu Riegler"
      sub="aka. Jean Mèche"
      intro="Web Enthusiast"
    ></app-page-header>

    <h2
      class="mt-12 text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-3xl"
    >
      Latest Posts
    </h2>

    <div class="mt-6 w-full grid grid-cols-1 gap-4">
      <app-featured-blog-preview [article]="article" *ngFor="let article of blogArticles" />
    </div>
    <div class="flex flex-col items-end	p-4">
      <a
        routerLink="blog"
        aria-hidden="true"
        class="relative z-10 mt-4 flex items-center text-sm font-medium text-blue-500 group"
      >
        <span
          class="absolute -inset-y-4 -inset-x-2 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-900/50 sm:-inset-x-6 sm:rounded-2xl"
        ></span>

        <span class="z-10">
          See more
          <svg
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            class="ml-1 h-4 w-4 stroke-current inline"
          >
            <path
              d="M6.75 5.75 9.25 8l-2.5 2.25"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </span>
      </a>
    </div>

    <h2
      class="mt-12 text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-3xl"
    >
      Sport
    </h2>
    <app-strava />
  `,
})
export default class HomeComponent {
  public blogArticles = injectContentFiles<ContentMetadata>((contentFile) =>
    contentFile.filename.includes('/src/content/posts'),
  )
    .filter((article) => {
      return new Date() > new Date(article.attributes.date);
    })
    .sort((a1, a2) => (a1.attributes.date > a2.attributes.date ? -1 : 1))
    .slice(0, 4);
}
