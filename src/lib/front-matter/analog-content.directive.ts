import {ContentRenderer, injectContent} from '@analogjs/content';
import {isPlatformBrowser} from '@angular/common';
import {AfterViewChecked, Directive, inject, NgZone, OnChanges, OnDestroy, OnInit, PLATFORM_ID, TemplateRef, ViewContainerRef,} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {DomSanitizer, Meta, Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {from, take} from 'rxjs';

import {ContentMetadata, ContentWithMetadata} from '../content-metadata/content-metadata';
import {isEmpty} from '../util/is-empty';

@Directive({
  selector: '[analogContent]',
  standalone: true,
})
export default class AnalogContentDirective implements OnInit, OnChanges,
                                                       AfterViewChecked,
                                                       OnDestroy {
  private _templateRef = inject(TemplateRef<any>);
  private _viewContainer = inject(ViewContainerRef);
  private _sanitizer = inject(DomSanitizer);
  private _contentRenderer = inject(ContentRenderer);
  private _meta = inject(Meta);
  private _title = inject(Title);
  readonly route = inject(ActivatedRoute);
  private readonly platformId = inject(PLATFORM_ID);
  private zone = inject(NgZone);

  static mermaid: any;

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

  constructor() {
    if (isPlatformBrowser(this.platformId) && !AnalogContentDirective.mermaid) {
      this.loadMermaid()
    }
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
          headings: this._contentRenderer.getContentHeadings().filter(
              (h) => h.level < 4),
          content: this._sanitizer.bypassSecurityTrustHtml(body),
        };
        this._viewContainer.createEmbeddedView(this._templateRef, context);

        this._title.setTitle(`${attributes.title} | blog | Matthieu Riegler`);
        this._meta.updateTag({property: 'og:type', content: 'website'});
        this._meta.updateTag({property: 'og:title', content: attributes.title});
        this._meta.updateTag(
            {property: 'og:description', content: attributes.excerpt});
        this._meta.updateTag({
          property: 'og:image',
          content: `https://riegler.fr/${attributes.coverImage}`,
        });

        this._meta.updateTag({name: 'twitter:card', content: 'summary'});
        this._meta.updateTag(
            {name: 'twitter:creator', content: '@jean__meche'});
      });
    });
  }

  ngAfterViewChecked() {
    this._contentRenderer.enhance();
    this.zone.runOutsideAngular(
        () => AnalogContentDirective.mermaid?.default.run());
  }

  ngOnDestroy() {
    this._meta.removeTag('property="og:title"');
    this._meta.removeTag('property="og:description"');
    this._meta.removeTag('property="og:image"');
  }

  private loadMermaid() {
    this.zone.runOutsideAngular(
        () =>
            // Wrap into an observable to avoid redundant initialization once
            // the markdown component is destroyed before the promise is
            // resolved.
        from(import('mermaid'))
            .pipe(takeUntilDestroyed())
            .subscribe((mermaid) => {
              AnalogContentDirective.mermaid = mermaid;
              mermaid.default.initialize({startOnLoad: false});
              // Explicitly running mermaid as ngAfterViewChecked
              // has probably already been called
              mermaid?.default.run();
            }));
  }
}
