import {TableOfContentItem} from '@analogjs/content/lib/content-renderer';
import {SafeHtml} from '@angular/platform-browser';

export type RawContentMetadata = {
  title: string;
  date: string;
  private?: string;
  excerpt: string;
  coverImage: string;
};

export type ContentMetadata = Omit<RawContentMetadata, 'date'|'private'> & {
  date: Date;
  private: boolean;
};

export type ContentWithMetadata = {
  metadata: ContentMetadata;
  content: SafeHtml;
  headings: TableOfContentItem[];
};
