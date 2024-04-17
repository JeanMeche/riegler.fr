---
title: 'Hybrid Change detection in v18'
excerpt: 'Zoneless helps Zone-based.'
coverImage: 'src/content/posts/2024-04-17-zoneless-with-zoneless-hybrid/markus-spiske-UhxkK9tTHKs-unsplash.jpg'
coverCredit: 'Photo de <a href="https://unsplash.com/fr/@markusspiske">Markus Spiske</a> sur <a href="https://unsplash.com/fr/photos/gros-plan-dune-voiture-UhxkK9tTHKs">Unsplash</a>
  '
date: '2024-04-17T00:00:00.000+02:00'
---

Do you like zoneless ? Well this is related but will interest everybody that runs zoneful apps !

As you might know, Angular v18 will land experimental support for zoneless change detection. I won't go into too much into details here, I recommend you have a look at [the article by my buddy @Enea](https://justangular.com/blog/a-new-era-for-angular-zoneless-change-detection).

While Zoneless is a very interesting topic, Zoneful apps will hugely benefit from the work around the official zoneless support. For technical details you can have a look at [this PR](https://github.com/angular/angular/pull/55102) which introduces changes for change detection.  We'll call this Hybrid Mode.

## Inside, outside the zone

Up to v17, Zone based apps relied on `Zone.js` to schedule change detection.

Basically, change detection was scheduled when an patched browser API was invoked (`setTimeout`, `setInterval`, `Promise.then`, `addEventListener` etc).

This came with a caveat, Change Detection was only triggered when you were in the Angular zone. This had performance implications, which led us to write code jumping in and out of the Angular zone respectively with `ngZone.runOutSideAngular(() => ...)`/ `ngZone.run(() => ...)`.
This meant that the execution context mattered, which is something that can hardly be ensured statically.

One of the common issue we've seen developers had, was having signals being updated outside the Angular zone not scheduling a change detection cycle.

This was not considered great DX. Updating a signal really is telling the framework, "Hey data changed, please refresh my component". Angular should not ignore changes that happen outside the zone.

## Zoneless scheduling

Dropping `zone.js` for CD scheduling meant that a new scheduler had to be implemented. In v18 it is available behind the fancy named `provideExperimentalZonelessChangeDetection()` provider function.

Its job is to basically schedule a CD cycle when:

* A Signal updated (via `set()`/`update()`)
* Calls to `changeDetectorRef.markForCheck()`
* A subscribed `Observable` with the `AsyncPipe` receives a new value
* A component get attached/detached (via `detach()`/`attach`)
* setting an input (`ComponentRef.setInput()`)

## Hybrid Scheduling

In v18, for Zone-based apps, the framework will leverage this same scheduler alongside the existing Zone-based scheduler : Welcome to hybrid mode.

Change detection will work as before but will bring DX improvements.

Imagine a situation where you're jumping outside the angular zone.

```ts
ngZone.runOutsideAngular(() => {
  setInterval(() => {
    someFunctionSomewhere();
  }, 1000);
})


function someFunctionSomewhere() {
  mySignal.set(newValue)
}

```

In this example, nothing will schedule a change detection. `setInterval`, because of the context (outside the angular zone) won't trigger CD and signals by themselves don't schedule any CD, they just mark the component as dirty. This make this code a bit brittle. Because of the execution context you don't know if `someFunctionSomewhere` will actually result in the updated view.

Here hybrid mode will come in handy and remove the execution context issue: A signal update will always schedule a CD cycle.<br/>
You're asking for an update, you will get an update, not matter the context. Great DX win ain't it ?!

To sum up the changes, these are the new cases when Change Detection will be scheduled:

* You're explicitly instructing the framework to update : `signal.set()`/`signal.update()`/ `changeDetectorRef.markForCheck()`
* A new value is passed to an `AsyncPipe`. It being based on `markForCheck`, it will now also always schedule CD
* When attaching/detaching views

## Am I getting to much CD scheduling with hybrid mode ?

I see your questions coming! I'm telling you, CD scheduling will happen outside the angular zone. Will that impact performances ?

Yes, running outside the angular zone was meant to reduce the numbers of CD scheduling. It will stay this way for all `zone.js` patched API. `setInterval` will still not schedule CD, you don't have to worry about that.

What will change is that, if ever you were telling the framework to update its state (via `signal.set` of `markForCheck()`); it will now schedule change detection because you explicitly told him to !

## Hybrid Mode is default in v18

How do you benefit from that ? This feature is enabled by default since the `18.0.0-next.5` pre-release.

If you have an issue with this feature, an opt-out is still possible with [`provideZoneChangeDetection`](https://angular.dev/api/core/provideZoneChangeDetection) the provider function:

```ts
bootstrapApplication(App, {
  providers: [
    provideZoneChangeDetection({ ignoreChangesOutsideZone: true }),
  ],
});
```

➡️ Enjoy this short [stackblitz demo](https://stackblitz.com/edit/v18-hybrid-mode) of Hybrid scheduling.
