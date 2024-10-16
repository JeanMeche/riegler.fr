---
title: 'Understanding effects'
excerpt: 'Root vs View effects in v19'
coverImage: 'src/content/posts/2024-10-15-effect-context/vackground-com-ZNkiEWL02mI-unsplash.jpg'
coverCredit: 'Photo de <a href="https://unsplash.com/fr/@vackground">vackground.com</a> sur <a href="https://unsplash.com/fr/photos/un-arriere-plan-abstrait-de-couleurs-bleues-vertes-et-jaunes-ZNkiEWL02mI">Unsplash</a>'
date: '2024-09-19T00:00:00.000+02:00'
---

Unlike other signals APIs, the `effect` hasn't stabilized yet and is still in developer preview. This has a reason as scheduling and reactivity context need some fine tuning based on developer feedback.

Effects are a construct which executes a reactive function whenever the signals it reads are updated. They're declared via the `effect()` function:

#### `Effect definition`

```
function effect(fn: (cleanupFn: CleanupFn) => void, options?: EffectOptions): EffectRef;

interface EffectOptions {
  injector?: Injector;
  forceRoot?: true;
  manualCleanup?: boolean;
}
```

## Context dependent effects

Effects can be classified into two types: root effects and view effects. The type created is determined by the context in which the `effect()` function is called. If called within components, a view effect is generated; otherwise, a root effect is generated.

Note that, Angular handles for you which type of effect is creating depending on the calling context. There is no need to explicitly choose between view and root effects. This behavior can be overriden with the `forceRoot` flag that enforces the creation of a root effect.

## Root effects

Root effects are top-level effects within an application and belong to no hierachy and independent from component updates. Effects created in root services for example are root effects

They are useful for operations like:

- Propagating state changes to other signals (when computeds are not an option).
- Synchronizing state with the backend or some local storage
- Rendering not tied to a component (e.g. integration w/ other frameworks)
- Logging/Debugging

Root effects are scheduled via a macrotask, on each `ApplicationRef.tick` (and while there are dirty root effects).
They are queued in FIFO order: effects that become dirty first will execute first.

One particular consequence of dirty root effects running until the queue is empty is that you might see effects running kind-of synchronously.

```ts
sig = signal(0);

#myRootEffect = effect(() => {
  if (this.sig() < 5) {
    console.log(this.sig());
    this.sig.update((s) => s + 1);
  }
});
```

This sample code will log 5 times before running any Change Detection.

Concerning unit test, you can flush the root effects with `TestBed.flushEffects()`.

## View effects

View effects are effects within the component hierarchy and execute as part of change detection cycles. Because of this timing, view effects can be used to respond to input signal changes, or to update state used in child components (including creating and destroying child views).

The need for view effects is driven by two major use cases / concerns which are not served by root effects:

1. Signal inputs.

Input signals are set as part of the change detection process. This timing is important for effects that monitor them. More importantly, required signal inputs can't be read until they received their first value. This means that effects must not be scheduled until the component's inputs have been set.

Crucially, `input.required` signals are not allowed to be read until they have received their initial value. This means that effects must not be scheduled until the component's inputs have been set.

2. Effects that affect the component's state or the state of child components.

A major reason to create effects in components is to react to input changes and update component state, either by deriving new values for the component or its children, or by creating or destroying embedded views. For example, the following effect implements a reactive version of `@if` control flow:

#### `Effect that needs to run ahead of CD`

```ts
const show = computed(() => !!cond());
let view;
effect(() => {
  if (show()) {
    view = this.vcr.createEmbeddedView(this.childView);
  } else {
    view.destroy();
  }
});
```

Now imagine this effect runs after change detection. This would have 2 major consequences :

- If a child view is created, it would have to schedule a new Change detection cycle, which would be inefficient
- If the `cond` become false (and consequently `show` also), the embedded view would get change detected before being destroyed. This will result in a violation of the invariant that the effect is trying to enforce, and the embedded view will be change detected with a null value it was not written to handle.

In other words, effects that affect the rendering of their children must run before those children undergo change detection. Failing to do so can lead to broken invariants and crashes, as well as inefficiency. View effects ensure this guarantee.
For this reasons view effect will run during change detection at the begining of each component check.

See [this stackblitz example](https://stackblitz.com/edit/angular-18-component-effect-timing?file=src%2Fmain.ts) of this issue with v18 effect timing.

### Scheduling

View effects are associated with a given node within a template. For example, given the template:

```html
<div tooltipDirective>...</div>
<child-cmp childDirective />
```

The effects for tooltipDirective would execute when the update pass reached the `<div>` node, and the effects for `<child-cmp>` and childDirective would execute when the update pass reached the `<child-cmp>` node. This is the same mechanism that directive lifecycle hooks and host bindings use today.

View effects should run before host bindings, as they might update state which is read in host bindings. This is a similar timing to ngOnChanges / ngDoCheck. Note that this requires the parent view of the associated node to be refreshed in order to trigger the effect. This is usually the case anyway (in the common case, an input signal from that view was what triggered the effect) but is sub-optimal if the signal triggering the effect had nothing to do with the parent view. We could resolve this inefficiency with some investment, but it may not be worth the complexity.

### `AfterRenderEffect`

With view effects triggering before the components updates & change detection, we still need a reactive primitive that would be triggered once the application is fully rendered.

This is what `AfterRenderEffect` is built for and it will execute registered effects during specific phases.

- `earlyRead`
- - Use this phase to **read** from the DOM before a subsequent `write` callback, for example to perform custom layout that the browser doesn't natively support. Prefer the `read` phase if reading can wait until after the write phase. **Never** write to the DOM in this phase.
- `write`
- - Use this phase to **write** to the DOM. **Never** read from the DOM in this phase.
- `mixedReadWrite`
- - Use this phase to read from and write to the DOM simultaneously. **Never** use this phase if it is possible to divide the work among the other phases instead.
- `read`
- - Use this phase to **read** from the DOM. **Never** write to the DOM in this phase.

#### `afterViewEffect`

```ts
afterRenderEffect({
  earlyRead: () => ...,
  write: () => ...,
  mixedReadWrite: . ..,
  read: () => ...,
});
```

## Error handling & Testing

As both type of effects are run as part of change detection, they report both to the change detection `ErrorHandler`.  
This means that an error happening inside an effect will thrown at the top, namely on `ApplicationRef.tick()`.

Here is an example that checks for errors during the execution of an effect.

```ts
it('should throw error...', () => {
  // create an effect that throws
  const appRef = TestBed.inject(ApplicationRef);
  effect(
    () => {
      throw new Error('fail!');
    },
    {injector: appRef.injector},
  );

  // explicitly run the CD and check for the thrown exception
  expect(() => appRef.tick()).toThrowError('fail!');
});
```

In the case of more complex error handling, we can resort to listening to the `ErrorHandler` itself.

Because an exception that happen during an effect execution will bubble up to the change detection process, it is important to disable that
behavior in the tests by setting `rethrowApplicationErrors: false,` (or else `tick()` throws)

Here is our example updated, where the exception is checked via the `ErrorHandler`

```ts
it('should throw error...', () => {
  let lastError: any = null;
  class FakeErrorHandler extends ErrorHandler {
    override handleError(error: any): void {
      lastError = error;
    }
  }

  TestBed.configureTestingModule({
    providers: [{provide: ErrorHandler, useFactory: () => new FakeErrorHandler()}],
    // we make sure to prevent tick() from throwing.
    rethrowApplicationErrors: false,
  });

  // create an effect that throws
  const appRef = TestBed.inject(ApplicationRef);
  effect(
    () => {
      throw new Error('fail!');
    },
    {injector: appRef.injector},
  );

  // explictly run the CD
  appRef.tick();
  // check for errors that were reported
  expect(lastError.message).toBe('fail!');
});
```


## Last word

As mentionned in the [Angular blog post on `effect`](https://blog.angular.dev/latest-updates-to-effect-in-angular-f2d2648defcd),
because of the changes around the timing, `effect` will remain in developer preview to gather additional feedback. 

Feel free to [report issues](https://github.com/angular/angular/issues/new) you might encounter with those changes.