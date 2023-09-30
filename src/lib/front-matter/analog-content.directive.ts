import {ContentRenderer, injectContent} from '@analogjs/content';
import {
  AfterViewChecked,
  Directive,
  OnChanges,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';
import {DomSanitizer, Meta} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {take} from 'rxjs';

import {ContentMetadata, ContentWithMetadata} from '../content-metadata/content-metadata';
import {isEmpty} from '../util/is-empty';

@Directive({
  selector: '[analogContent]',
  standalone: true,
})
export default class AnalogContentDirective
  implements OnInit, OnChanges, AfterViewChecked, OnDestroy
{
  private _templateRef = inject(TemplateRef<any>);
  private _viewContainer = inject(ViewContainerRef);
  private _sanitizer = inject(DomSanitizer);
  private _contentRenderer = inject(ContentRenderer);
  private _meta = inject(Meta);
  readonly route = inject(ActivatedRoute);

  readonly post$ = injectContent<ContentMetadata>({
    param: 'slug',
    subdirectory: `posts/${this.route.snapshot.paramMap.get('slug')}`,
  });

  static ngTemplateContextGuard(
    directive: AnalogContentDirective,
    context: unknown,
  ): context is ContentWithMetadata {
    return true;
  }

  ngOnInit() {
    this.updateContent();
  }

  ngOnChanges(): void {
    this.updateContent();
  }

  updateContent() {
    this.post$.pipe(take(1)).subscribe(({content, attributes}) => {
      if (!attributes || !content) {
        return;
      }
      this._contentRenderer.render(content).then((body) => {
        if (!content || isEmpty(attributes)) {
          return;
        }
        this._viewContainer.clear();
        const context: ContentWithMetadata = {
          metadata: {
            ...attributes,
            date: new Date(attributes['date']),
          },
          content: this._sanitizer.bypassSecurityTrustHtml(body),
        };
        this._viewContainer.createEmbeddedView(this._templateRef, context);

        this._meta.updateTag({property: 'og:type', content: 'website'});
        this._meta.updateTag({property: 'og:title', content: attributes.title});
        this._meta.updateTag({property: 'og:description', content: attributes.excerpt});
        this._meta.updateTag({
          property: 'og:image',
          content: `https://riegler.fr/${attributes.coverImage}`,
        });

        this._meta.updateTag({name: 'twitter:card', content: 'summary'});
        this._meta.updateTag({name: 'twitter:creator', content: '@jean__meche'});
      });
    });
  }

  ngAfterViewChecked() {
    this._contentRenderer.enhance();
  }

  ngOnDestroy() {
    console.log('alal');
    this._meta.removeTag('property="og:title"');
    this._meta.removeTag('property="og:description"');
    this._meta.removeTag('property="og:image"');
  }
}
