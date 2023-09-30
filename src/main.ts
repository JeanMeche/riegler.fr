import {provideContent, withMarkdownRenderer} from '@analogjs/content';
import {provideFileRouter} from '@analogjs/router';
import {bootstrapApplication} from '@angular/platform-browser';
import 'zone.js';

import {withInMemoryScrolling} from '@angular/router';
import {AppComponent} from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideFileRouter(
      withInMemoryScrolling({anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled'}),
    ),
    provideContent(withMarkdownRenderer()),
  ],
}).catch((err) => console.error(err));
