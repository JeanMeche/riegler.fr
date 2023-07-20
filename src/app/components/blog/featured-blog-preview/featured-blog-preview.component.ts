import { ContentFile } from '@analogjs/content';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentMetadata } from '../../../../lib/content-metadata/content-metadata';

@Component({
  selector: 'app-featured-blog-preview',
  standalone: true,
  imports: [CommonModule, RouterLink],
  host: {
    class: 'flex flex-1',
  },
  styles: [
    `
      .article-cover {
        --scale: 1;
        mask-image: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0) calc(var(--scale) * 0%),
          rgba(255, 255, 255, 0.1) calc(var(--scale) * 6%),
          rgba(255, 255, 255, 0.5) calc(var(--scale) * 22.5%),
          rgba(255, 255, 255, 0.6) calc(var(--scale) * 25.5%),
          rgba(255, 255, 255, 0.7) calc(var(--scale) * 30%),
          rgba(255, 255, 255, 0.8) calc(var(--scale) * 36%),
          rgba(255, 255, 255, 0.9) calc(var(--scale) * 48%),
          rgba(255, 255, 255, 1) calc(var(--scale) * 60%)
        );
      }
    `,
  ],
  template: `
    <a
      *ngIf="article"
      class="transform hover:scale-[1.01] transition-all rounded-xl w-full bg-gradient-to-r p-1"
      [routerLink]="'/blog/' + article.slug"
    >
      <div
        class="flex flex-col h-full bg-white dark:bg-zinc-900 rounded-lg p-4 relative"
      >
        <h4
          class="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100"
        >
          {{ article.attributes.title }}
        </h4>
        <p class="mt-2 mb-6 text-sm text-zinc-600 dark:text-zinc-400">
          {{ article.attributes.excerpt }}
        </p>
        <img
          class="absolute h-full w-40 right-0 top-0 object-cover article-cover rounded-lg hidden md:block"
          [src]="article.attributes.coverImage"
        />
      </div>
    </a>
  `,
})
export class FeaturedBlogPreviewComponent {
  @Input()
  public article?: ContentFile<ContentMetadata>;
}
