---
title: 'Tree-shakable by default'
excerpt: 'Don''t run with a backpack full of rocks'
coverImage: 'src/content/posts/2023-10-08-tree-shakable-as-default/from-marwool-GbY8Xg5iTOA-unsplash.jpg'
coverCredit: 'Photo de <a href="https://unsplash.com/fr/@frommarwool">From Marwool</a> sur <a href="https://unsplash.com/fr/photos/GbY8Xg5iTOA">Unsplash</a>'
date: '2023-10-08T20:00:00.000+02:00'
---

When building a library, you write code that might not be used in the end.
If you don't write your features with tree-shaking in mind, unused code might land in the final bundles.
This isn't great, unused code should get shipped. It's like running with a backpack full of stones. It's useless and will only slow you down.

So when writing a library, it is great to "tree-shakable as default" in mind. You design your code to be removed by tree-shaking from the ground up.

## Abstract services with default providers

When writing an abstract service for the Angular framework, you probably go for standard `@Injectable()` with a provider and an a `provideXXXX()` function to keep your default implementation private.

```ts
// my.service.ts
@Injectable()
export abstract class MyService {}

//default.service.ts
/**
 * @private // This one is private, we don't want to expose it
 */
@Injectable()
export class DefaultService()

// providers.ts
provideAllFunctionalities() {
  return [
    // ... other providers before
    { provide: MyService, useClass: DefaultService }
    // ... other providers after
    ]
}
```

Functionally speaking, this code runs perfectly. It makes perfect sense in the context of an app that doesn't need to tree-shake its services. But because `MyService` and `DefaultService` are defined in the providers array, any app that will call this function won't be able to tree-shake these services.

In the context of a library this isn't great at all : Unused code should be stripped down at build-time.

## Levaraging `providedIn: 'root'`

From this point, where do you go to achieve tree-shaking for our service ?

In v6, the Angular team introduced a great feature to support tree shaking out-of-the-box for services : `providedIn:'root'`.

When you have `@Injectable(providedIn: 'root')`, you don't need to specify providers, Angular is able to automatically register providers of the service against the root injector when the service is injected somewhere.

This is the tool we're going to use to provide a default implementation for our service:

First we make our service `providedIn: 'root'` to make it available across the app.

```ts
@Injectable({provideIn:'root'})
export class DefaultService() {
  constructor(/* whatever you need */) {}
}
```

Then you specify that service as a default for the Token you'd like to inject. To do that, we specify the default factory with `useFactory`. We also use `providedIn: 'root'` to make that `MyService` tree-shakable.

```ts
@Injectable({
  providedIn: 'root', 
  useFactory: () => inject(DefaultService)
})
export abstract class MyService {}
```

So, thanks to `providedIn: 'root'`, we don't need to call `provideAllFunctionalities` for us to be able to `inject(MyService)`. And because of `useFactory`, `DefaultService` will be the default instance provided.

This is how you achieve tree-shakability by default for an abstract service !

## This pattern in the Angular code base

This pattern is used more an more across the angular code base, here are a few examples :

* [LocationStrategy](https://github.com/angular/angular/blob/00128e38538f12fe9bc72ede9b55149e0be5ead0/packages/common/src/location/location_strategy.ts#L33)
* [TitleStrategy](https://github.com/angular/angular/blob/00128e38538f12fe9bc72ede9b55149e0be5ead0/packages/router/src/page_title_strategy.ts#L38)
* [RouteReuseStrategy](https://github.com/angular/angular/blob/00128e38538f12fe9bc72ede9b55149e0be5ead0/packages/router/src/route_reuse_strategy.ts#L41)
* [UrlHandlingStrategy](https://github.com/angular/angular/blob/00128e38538f12fe9bc72ede9b55149e0be5ead0/packages/router/src/url_handling_strategy.ts#L20)
* [UrlSerializer](https://github.com/angular/angular/blob/00128e38538f12fe9bc72ede9b55149e0be5ead0/packages/router/src/url_tree.ts#L349)
