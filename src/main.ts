import 'zone.js';

import {provideContent, withMarkdownRenderer} from '@analogjs/content';
import {provideFileRouter} from '@analogjs/router';
import {bootstrapApplication} from '@angular/platform-browser';
import {withInMemoryScrolling, withViewTransitions} from '@angular/router';

import {AppComponent} from './app/app.component';
import 'prismjs/components/prism-cshtml';

bootstrapApplication(AppComponent, {
  providers: [
    provideFileRouter(
      withViewTransitions(),
      withInMemoryScrolling({anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled'}),
    ),
    provideContent(withMarkdownRenderer()),
  ],
}).catch((err) => console.error(err));
