import {provideContent, withMarkdownRenderer} from '@analogjs/content';
import {provideFileRouter} from '@analogjs/router';
import {enableProdMode} from '@angular/core';
import {renderApplication} from '@angular/platform-server';
import {withEnabledBlockingInitialNavigation} from '@angular/router';
import 'zone.js/node';
import 'prismjs/components/prism-coffeescript';

import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';

if (import.meta.env.PROD) {
  enableProdMode();
}

const config = {
  providers: [
    provideFileRouter(withEnabledBlockingInitialNavigation()),
    provideContent(withMarkdownRenderer()),
  ],
};

export function bootstrap() {
  return bootstrapApplication(AppComponent, config);
}

export default async function render(url: string, document: string) {
  return await renderApplication(bootstrap, {
    document,
    url,
  });
}
