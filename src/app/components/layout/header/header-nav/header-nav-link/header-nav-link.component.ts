
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-nav-link',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a
      class="relative -my-2 -mx-3 rounded-lg px-3 py-2 text-sm text-zinc-700 dark:text-zinc-400 transition-colors delay-150 hover:text-zinc-900 dark:hover:text-zinc-50 hover:delay-[0ms]"
      [routerLink]="href"
    >
      <span class="relative z-10">{{ title }}</span>
    </a>
  `,
})
export class HeaderNavLinkComponent {
  @Input() public title = '';
  @Input() public href = '';
}
