---
title: "Lazy-loading Angular's animation module"
excerpt: "A few kB less in your main bundle"
coverImage: "src/content/posts/2023-10-04-animations-async/milad-fakurian-PjG_SXDkpwQ-unsplash.jpg"
date: "2023-10-04T00:00:00.000Z"
---

The first RC of Angular v17 is just around the corner, let's take a look at an interesting feature that landed in this week's "next" release : the lazy-loading of  !

The [animation package](https://angular.io/guide/animations) in angular allows developers to easily add animations to their components by defining states, transitions and triggers. This module is used for example by the `@angular/material` module.

While practical to use, the package comes with a cost of around 60kB (or 16kB gzipped) which 72% of the entire `ng new` app (~82kB stripped from the Router and the Common module). This makes this package a prime candidate for lazy-loading.

## Current implementation

In Angular, the class responsible for rendering should implement `Renderer2`.  By default, Angular renders a template into DOM with the (private) `DomRenderer2`.

When you enable animations either by using the `BrowserAnimationsModule` module or the `provideAnimations` function, a new animation-aware `RendererFactory2` implementation is provided (called `AnimationRendererFactory`). The factory is used to produce animations-aware instances of a renderer (called `AnimationRenderer`). Both classes are directly referenced in the code, thus they (and all their dependencies) are eagerly included into the main bundle.

The default renderer, the `DomRenderer` does not support animations properties. It even throws the famous error `Found the synthetic property @...` to remind the developer to enable animations on the app.

## Introducing lazy-loading while keeping the API synchronous

The rendering API defined by the `Renderer2` interface is fully synchronous  and dates back to Angular v4.
Making it asynchronous would be a huge breaking change so this idea was discarded. With this is mind,
an alternative had to be found to return a renderer eagerly while loading the animation renderer lazily.

The chosen solution was to rely on the [delegation pattern](https://en.wikipedia.org/wiki/Delegation_pattern): A new `RendererFactory2`, the `AsyncAnimationRendererFactory` would create `DynamicDelegationRenderer`. This renderer would be relying on the default renderer while waiting for the animation module to be loaded and switch the delegate renderer to the `AnimationRenderer`.

Et voilà, we just made a synchronous API compatible with asynchronous loading.

## Using the new animation API

This API is available starting from `17.0.0-next.7`.

To enable the lazy-loading of the animation package, you will have to setup the providers by calling `provideAnimationsAsync()` from `@angular/platform-browser/animations/async` instead of `provideAnimations()`. It accepts an optional argument to use noop animations.

#### **`main.ts`**

```ts
bootstrapApplication(AppComponent, {
  providers: [
    provideAnimationsAsync(),
    provideRouter([ ... ]), // my animated components
  ],
})
```

To ensure the whole animation package is not eagerly loaded, `@angular/animation` must only be imported on lazy-loaded components only (lazy-loaded routes, @defer'ed components etc.).

## Implications

### Consequences of the dynamic renderer

Having a renderer that switches its delegate implementation has direct consequences on angular apps.
Let review the shortcomings.

On bootstrap, the renderer will always be the default one: the `DomRenderer`. This renderer isn't able to process animation instructions (states, transitions...).
So if we have a component that them, styling is going to be a no-op :

```ts
@Component({
  animations: [
    trigger('openClose', [
      state('open', style({  background: 'chartreuse' })),
      state('closed', style({  background: 'blue' })),
      transition('open => closed', [animate('1s')]),
      transition('closed => open', [animate('0.5s')]),
    ]),
  ],
  standalone: true,
})
export class OpenCloseComponent {
  isOpen = true;

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
```

In the example, the `DomRenderer` isn't able to apply the initial style, which should be `background: chartreuse`.
It isn't until the `AnimationRenderer` is picked up by the `DynamicDelegationRenderer` that the style would be updated to the expected color.

### lazy-loading & code splitting

This feature makes the most sense when the `@angular/animation` package is never eagerly loaded.
If an eagerly loaded component uses a function from this package, the whole package won't be split in a separate bundle and the lazy-loading will be useless.

This is quite easy to check in our own codebases but it can/will get tricky when using libraries. The one you'll probably have issues with is `@angular/material`. This official angular package relies (as of v17) heavily on the animation module. Around 15 material components are importing `@angular/animations`. If you use one of them in a non-lazy-loaded component, this will break the code splitting.

So be careful with the component you use/import on your non lazy-loaded components!

## Does my lazy loading work ?

It is possible to check wether the code splitting/lazy loading is correctly implemented in your app by check the serve/build output of the CLI.
If you're using the webpack-based builder `@angular-devkit/build-angular:browser`, you can enable the `namedChunk` option in your `angular.json` and check the output :

```text
Lazy Chunk Files                                                   | Names                      |  Raw Size
node_modules_angular_animations_fesm2022_browser_mjs.js            | angular-animations-browser | 176.66 kB | 
default-node_modules_angular_animations_fesm2022_animations_mjs.js | app-open-close-component   |  39.20 kB | 
src_app_open-close_component_ts.js                                 | app-open-close-component   |   4.45 kB | 
```

Here we can see that both `@angular/animations` and `@angular/animations/browser` are in separated bundles. Our lazy loading works  🎉🎉

NB: Named chunks with the esbuild builder is pending [this PR](https://github.com/angular/angular-cli/pull/25913).

## Final word

The new API is available as developer preview, please [report any issues](https://github.com/angular/angular/issues/new/choose) you might encounter.

If you have any questions on this new feature, feel free to reach out to me on [Twitter](https://twitter.com/Jean__Meche) !
