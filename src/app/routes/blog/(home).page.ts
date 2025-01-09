import {injectContentFiles} from '@analogjs/content';

import {Component} from '@angular/core';
import {ContentMetadata} from '../../../lib/content-metadata/content-metadata';
import {BlogPreviewComponent} from '../../components/blog/blog-preview/blog-preview.component';
import {PageHeaderComponent} from '../../components/layout/page-header/page-header.component';

@Component({
  selector: 'blog',
  standalone: true,
  imports: [BlogPreviewComponent, PageHeaderComponent],
  template: `
    <app-page-header title="Blog" intro="Writing about stuff."></app-page-header>
    <div class="mt-12 flex max-w-3xl flex-col space-y-16">
      @for (article of blogArticles; track article) {
        <app-blog-preview [article]="article"></app-blog-preview>
      }
    </div>
    `,
})
export default class BlogComponent {
  public blogArticles = [
    ...injectContentFiles<ContentMetadata>((contentFile) =>
      contentFile.filename.includes('/src/content/posts'),
    ),
  ]
    .filter((article) => {
      return new Date() > new Date(article.attributes.date) && !article.attributes.private;
    })
    .sort((a1, a2) => (a1.attributes.date > a2.attributes.date ? -1 : 1));
}
