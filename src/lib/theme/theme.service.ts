import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _platformId = inject(PLATFORM_ID);
  private _theme$ = new Subject<'light' | 'dark'>();
  public theme$ = this._theme$.asObservable();

  public init(renderer: Renderer2, document: Document): void {
    if (isPlatformBrowser(this._platformId)) {
      this._theme$.next(
        localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
      );
    }
    this.theme$.pipe().subscribe((theme) => {
      if (theme === 'dark') {
        renderer.addClass(document.documentElement, 'dark');
      } else {
        if (document.documentElement.className.includes('dark')) {
          renderer.removeClass(document.documentElement, 'dark');
        }
      }
    });
  }

  public toggleDarkMode(): void {
    const newTheme =
      localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    this._theme$.next(newTheme);
  }
}
