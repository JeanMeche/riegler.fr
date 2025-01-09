import {TableOfContentItem} from '@analogjs/content/lib/content-renderer';

import {Component, Input, inject, signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ActivatedRoute, RouterLink} from '@angular/router';

@Component({
  selector: 'app-blog-toc',
  standalone: true,
  imports: [RouterLink],
  template: `
    <aside>
      <nav>
        <section>
          <header>
            <h2>Content</h2>
          </header>
          <ul>
            @for (item of headings; track item) {
              <li
                class="docs-toc-item"
                [class.docs-toc-item-h2]="item.level === 2"
                [class.docs-toc-item-h3]="item.level === 3"
                [class.docs-toc-item-active]="item.id === activeItemId()"
                >
                <a routerLink="." [fragment]="item.id">{{ item.text }}</a>
              </li>
            }
          </ul>
        </section>
      </nav>
    </aside>
    `,
  styleUrls: ['./table-of-contents.component.scss'],
  host: {
    class: 'fixed right-4 flex',
  },
})
export class TableOfContentsComponent {
  @Input() headings: TableOfContentItem[] = [];

  activeItemId = signal('');

  constructor() {
    inject(ActivatedRoute)
      .fragment.pipe(takeUntilDestroyed())
      .subscribe((fragment) => {
        this.activeItemId.set(fragment!);
      });
  }
}
