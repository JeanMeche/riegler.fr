import {DOCUMENT, NgClass} from '@angular/common';
import {Component, OnInit, Renderer2, inject} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {ThemeService} from '../lib/theme/theme.service';
import {FooterComponent} from './components/layout/footer/footer.component';
import {HeaderComponent} from './components/layout/header/header.component';

@Component({
  selector: 'blog-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, NgClass],
  host: {
    class: '',
  },
  template: `
    <app-header
      class="w-full mx-auto max-w-7xl"
      (toggleThemeClicked)="toggleDarkMode()"
    ></app-header>
    <div class="flex-1 px-4 sm:px-8 mt-9">
      <div [ngClass]="{'mx-auto max-w-4xl lg:px-8': useLayout}">
        <router-outlet></router-outlet>
      </div>
    </div>
    <app-footer class="w-full mx-auto max-w-7xl" name="Matthieu Riegler"></app-footer>
  `,
})
export class AppComponent implements OnInit {
  private _themeService = inject(ThemeService);
  private _document = inject(DOCUMENT);
  private _renderer = inject(Renderer2);
  private _router = inject(Router);
  protected useLayout = true;

  public ngOnInit(): void {
    this._themeService.init(this._renderer, this._document);
    this._router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.useLayout = event.url != '/cv';
      }
    });
  }

  public toggleDarkMode(): void {
    this._themeService.toggleDarkMode();
  }
}
