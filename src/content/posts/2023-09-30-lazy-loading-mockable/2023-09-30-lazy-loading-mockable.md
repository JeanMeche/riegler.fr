---
title: "Lazy loading your services in Angular with tests in mind"
excerpt: "We should be able to mock what we lazy-load"
coverImage: "src/content/posts/2023-09-30-lazy-loading-mockable/injector.jpg"
date: "2023-09-30T00:00:00.000Z"
---

Bundle size is a critical subject when building a SPA. The bigger it is, the longer it will take to start the app.
Framework and developers have been relying more and more on lazy-loading to delay loading of non necessary code. The most common ones are lazy-loaded routes.

When it comes to services, we can lazy load it by using a dynamic `import()`.
Let's take as an example a situation where a page displays a heavy WebGL animation that we want to lazy-load.

We suppose that `HomeAnimation` is a Angular service with `Injectable({providedIn: 'root'})`.

#### **`home.component.ts`**

```typescript
class HomeComponent {
  injector = inject(Injector);
  ...
  private async loadHomeAnimation() {
    const HomeAnimation = import('./services/home-animation.service').then((c) => c.HomeAnimation),
    this.injector.get(HomeAnimation);
    this.homeAnimation.init(this.element);
  }
}
```

This is really straightforward but it has a major downside : This doesn't allow us to use a mock service in unit tests.

## Leverage dependency injection

DI is a powerful tool, we will leverage it here to create/share instances and to help on testing.

First let's start with this helper function.

```ts
export async function injectAsync<T>(
  injector: Injector,
  providerLoader: () => Promise<ProviderToken<T>>,
): Promise<T> { 
  const injectImpl = injector.get(InjectAsyncImpl);
  return injectImpl.get(providerLoader);
}
```

The injector will do 2 things here :

* Retrieve a an instance of `InjectAsyncImpl`, a class providing an implementation of lazy loading
* Create the instance of the service we just loaded (the class must be available to the injector, so you'll have to add `@Injectable({providedIn: 'root'})` to the class you want to lazy load)

The `InjectAsyncImpl` class can very simple:

#### **`inject-async.ts`**

```ts
@Injectable({providedIn: 'root'})
class InjectAsyncImpl<T> {
  async get(injector: Injector, providerLoader: () => Promise<ProviderToken<T>>): Promise<T> {
    const type = await providerLoader();

    return injector.get(type)
  }
}
```

With this implementation, we can now override the provider for `InjectAsyncImpl` in our unit test to return a mock instance of our lazy-loaded service.

#### **`my-test.spec.ts`**

```ts
TestBed.configureTestingModule({
  providers: [
    { provide: InjectAsyncImpl, useValue: { get () => Promise.resolve(MyMockedService) }}
  ]
});
```

Our current implementation works but the DX here is far from great. It's only easy to mock one lazy-loaded service and we'd have to create a different class/object for every mocked service. So let's refactor that to improve it.

## Improving DX

To simplify the mocking of our lazy-loaded services, we'll add support for overrides to our implementation.

#### **`inject-async.ts`**

```ts
@Injectable({ providedIn: 'root' })
class InjectAsyncImpl<T> {
  private overrides = new WeakMap(); // no need to cleanup
  override<T>(type: Type<T>, mock: Type<unknown>) {
    this.overrides.set(type, mock);
  }

  async get(injector: Injector, providerLoader: () => Promise<ProviderToken<T>>): Promise<T> {
    const type = await providerLoader();

    // Check if we have overrides, O(1), low overhead
    if (this.overrides.has(type)) {
      const module = this.overrides.get(type);
      return new module();
    }
  }
}
```

These overrides will be set by a helper function

```ts
export function mockAsyncProvider<T>(type: Type<T>, mock: Type<unknown>) {
  return [
    {
      provide: ENVIRONMENT_INITIALIZER,
      multi: true,
      useValue: () => {
        inject(InjectAsyncImpl).override(type, mock);
      },
    },
  ];
}
```

`ENVIRONMENT_INITIALIZER` is a multi-provider token for initialization functions that will run upon construction of an environment injector. So the `override` method will be called on setup for every mocked service.

Now we have a nice & clean testing setup!

#### **`my-test.spec.ts`**

```ts
 * TestBed.configureTestingModule({
 *     providers: [
 *       mockAsyncProvider(MyFooService, MyFakeService)
 *       mockAsyncProvider(MyBarService, MyBarService)
 *   ]
 * });
```

## Improving Angular integration

When providing a service in root, the service will be created by the root injector.
This has a major downside of never firing `DestroyRef.onDestroy`.

From the [official docs](https://angular.io/api/core/DestroyRef):
> If DestroyRef is injected in a component or directive, the callbacks run when that component or directive is destroyed. Otherwise the callbacks run when a corresponding injector is destroyed.

So if we want a lazy-loaded service that gets destroyed with the component that created it, we'll need to change our implementation.

Our constraints are :

* The service cannot be `providedIn: 'root'` (we want it to be destroyed with the `NodeInjector`)
* The service cannot be provided on the component, this would break the lazy loading
* We can't add a class to an injector, we'll need to create a new one.

With this in mind, we'll add following

```ts
if (!(injector instanceof EnvironmentInjector)) {
  // We're passing a node injector to the function

  // This is the DestroyRef of the component
  const destroyRef = injector.get(DestroyRef);

  // This is the parent injector of the environmentInjector we're creating
  const environmentInjector = injector.get(EnvironmentInjector);

  // Creating an environment injector to destroy it afterwards
  const newInjector = createEnvironmentInjector([type as Provider], environmentInjector);

  // Destroy the injector to trigger DestroyRef.onDestroy on our service
  destroyRef.onDestroy(() => {
    newInjector.destroy();
  });

  // We want to create the new instance of our service with our new injector 
  injector = newInjector;
}
return injector.get(module)!;
```

If we go back to our initial example, this how we would use our new helper method to lazy-load the HomeAnimation service.

```ts
export class HomeComponent {
  private readonly injector = inject(Injector); // The Node injector

  ...

  private async loadHomeAnimation() {
    this.homeAnimation = await injectAsync(this.injector, () =>
      import('./services/home-animation.service').then((c) => c.HomeAnimation),
    );

    this.homeAnimation.init(this.element);
  }
}
```

It is important here that the injector is a `NodeInjector` and not the `EnvironmentInjector`.
The former will be destroyed with the component while the latter will survive the component.

## Final implementation

Here is our final implementation of the `inject-async.ts` helper functions.

```ts
import {createEnvironmentInjector, DestroyRef, ENVIRONMENT_INITIALIZER, EnvironmentInjector, inject, Injectable, Injector, Provider, ProviderToken, Type,} from '@angular/core';

/**
 * inject a service asynchronously
 *
 * @param: injector. If the injector is a NodeInjector the loaded module will be destroyed alongside its injector
 */
export async function injectAsync<T>(
  injector: Injector,
  providerLoader: () => Promise<ProviderToken<T>>,
): Promise<T> {
  const injectImpl = injector.get(InjectAsyncImpl);
  return injectImpl.get(injector, providerLoader);
}

@Injectable({providedIn: 'root'})
class InjectAsyncImpl<T> {
  private overrides = new WeakMap(); // no need to cleanup
  override<T>(type: Type<T>, mock: Type<unknown>) {
    this.overrides.set(type, mock);
  }

  async get(injector: Injector, providerLoader: () => Promise<ProviderToken<T>>): Promise<T> {
    const type = await providerLoader();

    // Check if we have overrides, O(1), low overhead
    if (this.overrides.has(type)) {
      const module = this.overrides.get(type);
      return new module();
    }

    if (!(injector instanceof EnvironmentInjector)) {
      // We're passing a node injector to the function

      // This is the DestroyRef of the component
      const destroyRef = injector.get(DestroyRef);

      // This is the parent injector of the environmentInjector we're creating
      const environmentInjector = injector.get(EnvironmentInjector);

      // Creating an environment injector to destroy it afterwards
      const newInjector = createEnvironmentInjector([type as Provider], environmentInjector);

      // Destroy the injector to trigger DestroyRef.onDestroy on our service
      destroyRef.onDestroy(() => {
        newInjector.destroy();
      });

      // We want to create the new instance of our service with our new injector 
      injector = newInjector;
    }

    return injector.get(module)!;
  }
}

/**
 * Helper function to mock the lazy-loaded module in `injectAsync`
 *
 * @usage
 * TestBed.configureTestingModule({
 *     providers: [
 *     mockAsyncProvider(SandboxService, fakeSandboxService)
 *   ]
 * });
 */
export function mockAsyncProvider<T>(type: Type<T>, mock: Type<unknown>) {
  return [
    {
      provide: ENVIRONMENT_INITIALIZER,
      multi: true,
      useValue: () => {
        inject(InjectAsyncImpl).override(type, mock);
      },
    },
  ];
}
```
