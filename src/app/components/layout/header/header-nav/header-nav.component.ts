import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderNavLinkComponent } from './header-nav-link/header-nav-link.component';

@Component({
  selector: 'app-header-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderNavLinkComponent],
  host: {
    class: 'relative z-10 flex items-center gap-16',
  },
  styles: [
    `
      img {
        transform: rotate(0) scale(1);
        transition: 2s;
      }

      img:hover {
        transform: rotate(720deg) scale(0.8);
        transition: 2s;
      }
    `,
  ],
  template: `
    <a aria-label="Home" routerLink="/">
      <img src="favicon.ico" />
      <!--         <svg  viewBox="0 0 98 99" fill="none" xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              class=" hover:delay-[0ms] delay-150 transition-colors hover:text-rose-400 text-rose-500 w-6 h-6">
        >
          <path stroke-width="10" d="M7 62.8028L34.7941 14.7121C39.0559 7.33964 48.5059 4.81017 55.8868 9.06708C63.2676 13.324 65.8 22.7632 61.5382 30.1357L39.1485 68.8643C34.8868 76.2368 37.4191 85.676 44.8 89.9329C52.1809 94.1898 61.6309 91.6604 65.8926 84.2879L91 40.8859"/>
        </svg> -->
    </a>
    <div class="hidden lg:flex lg:gap-10">
      <app-header-nav-link href="/" title="Home"></app-header-nav-link>
      <app-header-nav-link href="/blog" title="Blog"></app-header-nav-link>
      <!--       <app-header-nav-link href="/cv" title="Resume"></app-header-nav-link> -->
    </div>
  `,
})
export class HeaderNavComponent {}
