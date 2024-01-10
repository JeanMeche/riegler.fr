---
title: 'Zoneless Change Detection for everybody in preview in Angular 17.1'
excerpt: 'Are you ready ?'
coverImage: 'src/content/posts/2024-01-11-zoneless-preview/zones.jpg'
coverCredit: 'Photo by <a href="https://unsplash.com/@thethinblackframe?">Unsplash</a>'
date: '2023-12-11T00:00:00.000+02:00'
---

Zoneless refers to a framework feature where Change Detection operates without `zone.js`.

Although zoneless has not yet received official support in standalone applications, many developers have been using it successfully in conjunction with libraries like [RxAngular](https://www.rx-angular.io/).

Zoneless only impacts the scheduling of change detection. The underlying change detection mechanism is a distinct subject and remains consistent whether zones are utilized or not.

## Reasons for going zoneless

There are multiple motivations for developers to consider removing zone.js from their application stack. To enumerate a few:

- `zone.js` introduces a non-lazy loadable payload of around 30kB raw.
- `zone.js` has negative impact on debugging capabilities (makes the call stack a bit hard to read)
- The monkey patching of the native apis has negative impacts on performance (CD might be triggered too often because of `setInterval`, `requestAnimationFrame`, `addEventListeners` etc.)
- Having zones in your app requires you to handle them. Some API callbacks are run outside the angular zone, so you would.
- Staticly, it is hard to know in which zone you currently are, as this is a runtime context.
- Native async/await cannot be patched, therefor Angular relies on the babel `plugin-transform-async-to-generator` plugin.

## How does Zoneless Change Detection work in the 17.1 preview ?

### A Zoneless change detection scheduler

I've talked previously about change detection in a [previous article](/blog/2023-11-02-v17-change-detection). Until now Angular relied on `zone.js` and `NgZone` to schedule change detection by calling `ApplicationRef.tick()`.

To go zoneless, the framework has to rely on a new scheduler that would be responsible to call `ApplicationRef.tick()`.
The new scheduler is defined by the `ChangeDetectionScheduler` interface with a `notify()` method that should be called to schedule CD.
We talk about a scheduler because calls to `notify()` should be coalesced to prevent the framework from running useless CD cycles.

For v17.1, the team chose rely on a `setTimeout` based scheduler which is actually quite straight forward :

#### **`zoneless_scheduling_impl.ts`**

```ts
class ChangeDetectionSchedulerImpl implements ChangeDetectionScheduler {
  private appRef = inject(ApplicationRef);
  private taskService = inject(PendingTasks);
  private pendingRenderTaskId: number | null = null;

  notify(): void {
    if (this.pendingRenderTaskId !== null) return;

    this.pendingRenderTaskId = this.taskService.add();
    setTimeout(() => {
      try {
        if (!this.appRef.destroyed) {
          this.appRef.tick();
        }
      } finally {
        // If this is the last task, the service will synchronously emit a stable notification. If
        // there is a subscriber that then acts in a way that tries to notify the scheduler again,
        // we need to be able to respond to schedule a new change detection. Therefore, we should
        // clear the task ID before removing it from the pending tasks (or the tasks service should
        // not synchronously emit stable, similar to how Zone stableness only happens if it's still
        // stable after a microtask).
        const taskId = this.pendingRenderTaskId!;
        this.pendingRenderTaskId = null;
        this.taskService.remove(taskId);
      }
    });
  }
}
```

To schedule a change detection, the `notify()` method will need to be called by the framework.

### With Signals

When designed, one of the goal of signals was to be able to drop the requirement of `zone.js` to be able to schedule change detection.

For this reason, Signals are the easiest way to write zoneless apps: Every time a consumed signals gets updated,
the framework will call `ChangeDetectionScheduler.notify()` to schedule a Change Detection cycle.

There will be nothing else to do for you. You update one or multiple signals and you'll get a CD cycle.

Pretty cool Huh ?!

### Without Signals

While signals make Zoneless so easy to support, they aren't required and alternatives exist!
Yes you understood correctly, you can now enable zoneless even though you haven't migrated to signals yet !

At the heart of the framework, a private function called `markViewDirty` does also invoke `ChangeDetectionScheduler.notify()`.

#### **`mark_view_dirty.ts`**

```ts
export function markViewDirty(lView: LView): LView|null {
  lView[ENVIRONMENT].changeDetectionScheduler?.notify();
  ...
}
```

This function is actually an old one, it has been present in the framework for many years and is already invoked in several cases.
Among others `AsyncPipe` (via `markForCheck()`) and template event listeners do call this function.

This means that previously patched APIs like `setTimeout`, `setInterval`, `requestAnimationFrame`, `fetch` or resolved/rejected promises will not trigger change detection.

So if your app happens to rely heavily on the Observables/`AsyncPipe` pattern your app will likely also support Zoneless Change Detection.

## Enable the zoneless preview

Zoneless Change Detection is currently in private preview : it relies on a private method that is expected to be renamed before the feature officially land. The preview is meant to help the team to gather feedback on the feature in order to improve it.

To enable Zoneless change detection you 2 need things:

- add `ɵprovideZonelessChangeDetection` to your providers.
- remove `zone.js` from your `polyfills` entry in your `angular.json` config file.

#### **`main.ts`**

```ts
bootstrapApplication(AppComponent, {
  /* ɵprovideZonelessChangeDetection()
   * enables zoneless magic
   */
  providers: [ɵprovideZonelessChangeDetection()],
});
```

`ɵprovideZonelessChangeDetection` is available from `17.1.0-rc.0` onwards.

<br>
<div class="warning">
I do not recommend using zoneless change detection on production apps (or do it at your own risk, as always with private APIs).
</div>

## Demo

Enjoy a small zoneless demo app, with examples of change detection with signals, async pipe and a listener.

[Here on stackblitz](https://stackblitz.com/edit/angular-zoneless-demo?file=package.json,src%2Fmain.ts)

## Notes

As mentioned this is not a released feature, some pieces are still missing.
The CLI doesn't allow at the moment the configuration of the babel plugin. This issue is tracked [on the CLI repo](https://github.com/angular/angular-cli/issues/22191).

If you decide to test out this feature and come across any difficulties, don't hesitate to [create a new issue](https://github.com/angular/angular/issues/new/choose) and provide a reproduction (stackblitz or github repo).
