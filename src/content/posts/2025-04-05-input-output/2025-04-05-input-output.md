---
title: 'Asymmetry of Angular Inputs and Outputs'
excerpt: 'Your output is not a state'
coverImage: 'src/content/posts/2025-04-05-input-output/andrew-ridley-jR4Zf-riEjI-unsplash.jpg'
coverCredit:
  'Photo by <a href="https://unsplash.com/@aridley88">Andrew Ridley</a> on <a
  href="https://unsplash.com/photos/a-multicolored-tile-wall-with-a-pattern-of-small-squares-jR4Zf-riEjI">Unsplash</a>'
date: '2025-04-06T00:00:00.000+01:00'
---

In Angular, inputs and outputs are mechanisms used to communicate between components. An `input()` allows a parent
component to pass data into a child component, while an `output()` enables the child to pass back to the parent.

`input()` and `output()` are often seen as symetrical APIs. One example of that is `output()` is often wrong call a
signal output.

We'll see now, why they're are actually not symetrical APIs and what it implies.

## Inputs, a state based communication.

Inputs represent a state-based communication, meaning they allow a parent component to control the state of a child
component by passing data down through properties.

Conveniently, inputs are represented with signals. A reactive state based API.

```ts
@Component()
class MyButton {
  disabled = input<boolean>(false);
}
```

In this example, the `disabled` input can be read at anytime (it is not required and has a initial value). The signal
based reactivity allows the component to define specific behaviors when the value changes.

## Ouput, an event based communication

Outputs represent an event-based communication chanel, allowing a child component to notify its parent when something
has happened. They are usually triggered by another event.

```ts
@Component({
  template: `
    <button (click)="sendMessage()">Click Me</button>
  `,
})
export class ChildComponent {
  messageEvent = output<string>();

  sendMessage() {
    this.messageEvent.emit('Hello from Child!');
  }
}
```

As you can see, there is no real symmetry between inputs and ouputs. 

## Inputs/Ouputs in the era of signals. 

If you're up-to date with your pattern you'll know that signals promote state based programming with declarative derivation (`computed`, `linkedSignal`,`resource` etc). Often they are compared to an other reactive primitive `Observable` (see [RxJs](https://rxjs.dev/)), which rely on events. 

This why we end up with a signal when defining an `input()`, but `output()` does't exhibit no rely on signals. 
Outputs being event based, they are a perfect canditate for an `rxjs-interop` help : [`outputFromObservable`](https://angular.dev/api/core/rxjs-interop/outputFromObservable). 

```ts
@Directive({..})
export class MyDir {
  nameChange$ = <some-observable>;
  nameChange = outputFromObservable(this.nameChange$);
}
```

With `outputFromObservable` get a 1-to-1 behavior, each time the observable emits, a new value is emitted to the parent.

## State changes as an output ? 

With signal being used in more and more codebases, we seen some interesting feature request spawning. Like [for example 
an `outputFromSignal` helper](https://github.com/angular/angular/issues/58680). 

This is an interesting one, as it would create new interface between a state based world and an event-based world. 
Basically such helper could behave as `outputFromObservable(toObservable(mySignal())`. 

