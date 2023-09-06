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
