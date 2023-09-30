import {TableOfContentItem} from '@analogjs/content/lib/content-renderer';
import {SafeHtml} from '@angular/platform-browser';

export type RawContentMetadata = {
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
};

export type ContentMetadata = Omit<RawContentMetadata, 'date'> & {
  date: Date;
};

export type ContentWithMetadata = {
  metadata: ContentMetadata;
  content: SafeHtml;
  headings: TableOfContentItem[];
};
