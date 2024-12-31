import 'zone.js';

import {provideContent, withMarkdownRenderer} from '@analogjs/content';
import {withPrismHighlighter} from '@analogjs/content/prism-highlighter';
import {provideFileRouter} from '@analogjs/router';
import {bootstrapApplication} from '@angular/platform-browser';
import {withInMemoryScrolling, withViewTransitions} from '@angular/router';
import './lib/util/angular';

import {AppComponent} from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideFileRouter(
      withViewTransitions(),
      withInMemoryScrolling({anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled'}),
      withViewTransitions(),
    ),
    provideContent(withMarkdownRenderer()),
  ],
}).catch((err) => {
  console.error(err);
  withPrismHighlighter();
});
