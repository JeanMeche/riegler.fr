---
title: 'Replace your @Input setters with input() signals'
excerpt: 'Understand the caveats of input setters'
coverImage: 'src/content/posts/2024-05-01-input-setters-caveats/maxim-berg-kE8-rUKjtQU-unsplash.jpg'
coverCredit: 'Photo de <a href="https://unsplash.com/fr/@maxberg">Maxim Berg</a> sur <a href="https://unsplash.com/fr/photos/un-tres-grand-groupe-darbres-tres-colores-kE8-rUKjtQU">Unsplash</a>'
date: '2024-05-01T00:00:00.000+02:00'
---

Having input setters is a pattern quite common in angular apps, it is often used to (re)act when the value of the input changes.

#### `Input setter example`

```ts
class MyComponent {
  _isEnabled: boolean = false;
  @Input() set isEnabled(value: unkown) {
    _isEnabled = !!value;
  }
}
```

__First a disclaimer__, input setters (or any lifecycle event inside of change detection for that matter) aren't inherently bad.
It is fine, for example, to use them if you're coercing the new value to a boolean or something similar.

But because of when the setters are running (during change detection), there are 2 semi-independent concerns that we should be aware of. There are extra restrictions on what you can/should do inside them, and these can be subtle.

It's easy to accidentally do the wrong thing, with consequences that range from performance degradation to `ExpressionChanged` to UIs that don't update when you expect.

## Input setters, the caveats

### 1. Glitch prone input read

Input setters can be problematic because they run as each input is set individually. Within the setter, you cannot assume that all inputs have their updated value.
Trouble starts when consequences of that change are deeply neested into your app. We've seen people get in trouble when nexting a subject.

```ts
class MyComponent {
  inputSubject = Subject()
  @Input() value(value: MyType) {
    this.inputSubject.next(value);
  }
}
```

When you next a subject, you run all of the downstream subscribers synchronously with that new value. If those Observable chains use other input values too, you've just created a race condition.

```ts
class MyComponent {
  inputSubject = Subject()
  @Input() value(value: MyType) {
    this.inputSubject.next(value);
  }

  @Input() key: string; 

  constructor() {
    this.inputSubject.subscribe((value) => {
      update(value[this.key]) // could crash if `key` input is updated after value
    })
  }
}
```

At best, your subscribers are going to rerun when the next input is set, etc. At worst, you violate some invariant and crash. Sometimes inputs just happen to be set in the right order and everything works until a year later when someone makes a random change that causes the inputs to be set in a different order, exposing the bug.

### 2. Dataflow changes during Change Detection

More generally, any actions you take during change detection (e.g. in a lifecycle hook like `ngOnChanges`) have caveats: You are not supposed to make changes against Angular's top-down unidirectional data flow.

If you're just updating the local component state or a state that affects children, you're fine. However nothing prevents you from doing something like `globalStore.dispatch(HEY_MY_INPUT_CHANGED)` and trigger updates across the application, some of which might be `NG0100 ExpressionChanged`.

## Leveraging signals for glitch-free changes

One of the many feature or signal is glitch-freeness : you don't need to think about the restrictions of updating data in the middle of change detection or in which order in which inputs are set.

This is why `input()` signals with `computed()` or `effect()` are so nice.

```ts
class MyComponent {
  value = input.required<MyType>(); 
  key = input.required<string>();

  private updater = effect(() => {
    // No worry about the order
    update(this.value()[this.key()])
  })
}
```

## Note

I'd like to thank [Alex Rickabaugh](https://twitter.com/synalx) for consolidating my thoughts on that topic.
