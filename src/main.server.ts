import 'zone.js/node';

import {withPrismHighlighter} from '@analogjs/content/prism-highlighter';

import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-typescript';

import {provideContent, withMarkdownRenderer} from '@analogjs/content';
import {provideFileRouter} from '@analogjs/router';
import {enableProdMode} from '@angular/core';
import {renderApplication} from '@angular/platform-server';
import {withEnabledBlockingInitialNavigation} from '@angular/router';

import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import './lib/util/angular';

if (import.meta.env.PROD) {
  enableProdMode();
}

const config = {
  providers: [
    provideFileRouter(withEnabledBlockingInitialNavigation()),
    provideContent(withMarkdownRenderer(), withPrismHighlighter()),
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
