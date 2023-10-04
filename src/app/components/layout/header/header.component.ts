import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, EventEmitter, Output, ViewEncapsulation,} from '@angular/core';
import {RouterLink} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

import {HeaderNavLinkComponent} from './header-nav/header-nav-link/header-nav-link.component';
import {HeaderNavComponent} from './header-nav/header-nav.component';

const twIconBtnClasses =
    `inline-flex justify-center rounded-full border-transparent border p-1.5 outline-2 outline-offset-2 transition-colors hover:border-zinc-300 text-zinc-700 hover:border-zinc-400 active:bg-zinc-100 active:text-zinc-700/80`;
const twIconClasses = `w-5 h-5 dark:text-white text-zinc-800`;
const twMobileNavLinkClasses =
    `text-md text-zinc-700 dark:text-zinc-400 transition-colors delay-150 hover:text-zinc-900 dark:hover:text-zinc-50 hover:delay-[0ms]`;
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HeaderNavComponent,
    HeaderNavLinkComponent,
  ],
  template: `
    <div class="px-4 sm:px-6 lg:px-8 relative z-50 flex justify-between py-8">
      <app-header-nav></app-header-nav>
      <div class="flex items-center gap-6">
        <div class="lg:hidden">
          <button
            (click)="toggleMobileNav()"
            class="${twIconBtnClasses}"
            aria-label="Toggle site navigation"
            type="button"
            [attr.aria-expanded]="showMobileNav$ | async"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              stroke="currentColor"
              class="${twIconClasses}"
            >
              <path
                d="M5 6h14M5 18h14M5 12h14"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </button>
        </div>
        <a
          class="inline-flex justify-center rounded-full border-transparent border p-1.5 outline-2 outline-offset-2 transition-colors text-zinc-700 dark:text-zinc-100 hover:border-zinc-300 active:bg-zinc-100 active:text-zinc-700/80 lg:block"
          href="/api/rss.xml"
        >

        <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="currentColor"><path d="M215.788-144Q186-144 165-165.212q-21-21.213-21-51Q144-246 165.212-267q21.213-21 51-21Q246-288 267-266.788q21 21.213 21 51Q288-186 266.788-165q-21.213 21-51 21ZM720-144q0-120-45.257-224.479-45.257-104.478-123.429-182.708-78.171-78.231-182.571-123.522Q264.343-720 144-720v-96q140 0 261.628 52.376 121.629 52.377 213.591 144.283 91.963 91.906 144.372 213.459Q816-284.329 816-144h-96Zm-240 0q0-70-26-131t-72-107q-46-46-107-72t-131-26v-96q90.521 0 168.743 33.698Q390.965-508.605 450-450q58.605 59.035 92.302 137.257Q576-234.521 576-144h-96Z"/></svg>        </a>
        <button
          class="inline-flex justify-center rounded-full border-transparent border p-1.5 outline-2 outline-offset-2 transition-colors hover:border-zinc-300 text-zinc-700 active:bg-zinc-100 active:text-zinc-700/80 lg:block"
          (click)="toggleThemeClicked.emit()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="${twIconClasses}"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            />
          </svg>
        </button>
      </div>
    </div>

    <div *ngIf="showMobileNav$ | async">
      <div
        (click)="closeMobileNav()"
        class="fixed inset-0 z-30 dark:bg-zinc-900/60 bg-zinc-300/60 backdrop-blur"
        aria-hidden="true"
      ></div>
      <div
        class="absolute inset-x-0 top-0 z-40 origin-top rounded-b-2xl dark:bg-zinc-800 bg-zinc-50 px-6 pb-8 pt-24 shadow-2xl shadow-zinc-900/20"
        tabindex="-1"
      >
        <div class="flex flex-col space-y-4">
          <a class="${twMobileNavLinkClasses}" routerLink="/">Home</a>
          <a class="${twMobileNavLinkClasses}" routerLink="/blog">Blog</a>
          <a class="${twMobileNavLinkClasses}" routerLink="/cycling">Cycling</a>
          <button
            class="${twIconBtnClasses}"
            (click)="toggleThemeClicked.emit()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="${twIconClasses}"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private _showMobileNav$ = new BehaviorSubject(false);
  public showMobileNav$ = this._showMobileNav$.asObservable();
  @Output() public toggleThemeClicked = new EventEmitter<void>();

  public toggleMobileNav(): void {
    this._showMobileNav$.next(!this._showMobileNav$.getValue());
  }
  public closeMobileNav(): void {
    this._showMobileNav$.next(false);
  }
}
