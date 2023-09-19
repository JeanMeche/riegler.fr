---
title: "Trigger ChangeDetection but not too often"
excerpt: "Discover the magic of microtasks coalescing"
coverImage: "src/content/posts/2023-09-20-cd-coalescing/larry-costales-YFR_x3MqpHc-unsplash.jpg"
coverCredit: "Photo de <a href=\"https://unsplash.com/fr/@larry3?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText\">Larry Costales</a> sur <a href=\"https://unsplash.com/fr/photos/YFR_x3MqpHc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText\">Unsplash</a>"
date: "2023-09-20T00:00:00.000Z"
---

In Angular, when it comes to zone-based change detection, we sometimes need to trigger it by hand.
At the time of writing this article there is no API to schedule a new ChangeDetection (CD) cycle ([pending issue](https://github.com/angular/angular/issues/43168)).

## Foreword

This article will be talking about JS internals and more particularly about the browser's event loop.

If you're not familiar with terms like *microtask*, *macrotask* or *queues*, I recommend you read this great article by Jake Archibald : [Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)

Also for the sake of simplicity, from here on, when I speak of enqueuing tasks, this will refer to enqueuing function callback as micro/macrotasks.

## Change Detection firing in Angular

Basically in Angular, a change detection cycle is fired when `ApplicationRef.tick()` is called.
This happens automatically every time the microtask queue has been emptied.

#### **`ApplicationRef.ts`**

```ts
this._onMicrotaskEmptySubscription = this.zone.onMicrotaskEmpty.subscribe({
    next: () => {
    this.zone.run(() => {
        this.applicationRef.tick();
    });
    }
});
```

`zone.js` is precious here, because there is no native API to inspect the state of the microtasks and macrotasks queues.

## Schedule a change detection

### Enqueing a macrotask with `setTimeout()`

If you worked a bit with Angular, you probably already had to write somewhere a `setTimeout()` to fix a bug.
As you probably learn quickly, this solves a lot of issues by triggering a new CD cycle.

![Not great, not terrible](src/content/posts/2023-09-20-cd-coalescing/not-great.jpg)

<p style="text-align: center;">It's workaround, not great, not terrible.</p>

The way this works is following:

1. You call `setTimeout()`
2. A macrotask is enqueued
3. The callback in the macrotask queue is executed and the microtasks queue is also executed/empties.
4. The `onMicrotaskEmpty` observable fires
5. `ApplicationRef.tick()` is called

`setTimeout()` enqueues a macrotask. Because macrotasks are executed only one task at the time before handing back the execution to the event loop,
you will have as many CD cycles as you have called `setTimeout()`.
As said, “Not great, not terrible“ (it fixes a bug).

### Enqueuing a microtask

A better alternative to calling `setTimeout()` and its macrotask is to rely on microtasks.
The 2 mosts famous APIs are `Promise.resolve().then(() => ...)` and `queueMicroTasks(() => {})`.
By calling one of these functions, you will effectively enqueue a microtask.

Unlike the macrotask queue, the microtask queue will see all its tasks executed, one after another, including those added during the said execution of the queue.

<div class="warning">Be wary on enqueuing recursively, this will lead to an infinite loop.</div>

This means, every callback in the queues will be executed before handing back the execution to the event loop. In Angular terms this means, you will only get a single CD cycle.

This will help you optimise the firing of CD cycles by only scheduling a single ChangeDetection cycle, no more, no less.

## Demo

The following functions will respectively enqueue 3 macrotasks and 3 microtasks.

```ts
  fireMacrotasks() {
    setTimeout(() => {}, 100);
    setTimeout(() => {}, 100);
    setTimeout(() => {}, 100);
  }

  fireMicrotasks() {
    queueMicrotask(() => {});
    queueMicrotask(() => {});
    queueMicrotask(() => {});
  }
```

The first function will effectively schedule 3 CD cycles wherease the second one will only schedule one.

➡️ [Run on Stackblitz](https://stackblitz.com/edit/angular-tasks-coalescing?file=src%2Fmain.ts)

## Bonus

Even the framework code relies on the microtasks to schedule CD cycles. Here is an excerpt of the [forms module](https://github.com/angular/angular/blob/0ee0f780e4c19d43dde9bac0bb6468ea6431d24b/packages/forms/src/directives/ng_model.ts#L30-L47).

#### **`ng_model.ts`**

```ts
/**
 * `ngModel` forces an additional change detection run when its inputs change:
 * E.g.:
 * ```
 * <div>{{myModel.valid}}</div>
 * <input [(ngModel)]="myValue" #myModel="ngModel">
 * ```
 * I.e. `ngModel` can export itself on the element and then be used in the template.
 * Normally, this would result in expressions before the `input` that use the exported directive
 * to have an old value as they have been
 * dirty checked before. As this is a very common case for `ngModel`, we added this second change
 * detection run.
 *
 * Notes:
 * - this is just one extra run no matter how many `ngModel`s have been changed.
 * - this is a general problem when using `exportAs` for directives!
 */
const resolvedPromise = (() => Promise.resolve())();

...
class NgModel 
  private _updateValue(value: any): void {
    resolvedPromise.then(() => {
      this.control.setValue(value, {emitViewToModelChange: false});
      this._changeDetectorRef?.markForCheck();
    });
  }

```
