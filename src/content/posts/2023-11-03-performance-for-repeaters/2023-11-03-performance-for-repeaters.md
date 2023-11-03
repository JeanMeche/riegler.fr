---
title: 'Performance by default for template repeaters'
excerpt: 'It''s about @for'
coverImage: 'src/content/posts/2023-11-03-performance-for-repeaters/david-streit-BumOnw4oEZo-unsplash.jpg'
coverCredit: 'https://commons.wikimedia.org/wiki/File:SunsetTracksCrop.JPG'
date: '2023-11-03T00:00:00.000+02:00'
---

One of the major features introduced in Angular v17 is the [new template syntax](https://blog.angular.io/meet-angulars-new-control-flow-a02c6eee7843) referred as the "@-syntax".

One of the notable outcomes of this new syntax is the introduction of deferrable views, a powerful feature that allows developers to lazy-load components from the templates. You can learn more about deferrable views in this [blog post](https://riegler.fr/blog/2023-10-05-defer-part1).

In addition to deferrable views, the Angular team has introduced the `@for` block, which is designed to replace the `ngFor` directive. The `@for` block provides a more structured and explicit way to handle loops and iterate over collections within your Angular templates. This new approach enhances the separation between control flow and declarative HTML in your templates.

## The new `@for` block

Here's an illustrative usage of the new `@for` block in Angular

```angular
<ul>
  @for (item of items; track item.id; let e = $even) {
    <li> Item #{{ $index }}: {{ item.name }}</li>
  }
</ul>
```

A notable departure from traditional structural directives is evident in this example. The new syntax, represented by the `@for` block, offers a distinct separation between control flow and declarative HTML.

Within the context of the `@for` block repeater, you have direct access to several implicit variables that are readily available. Furthermore, it's worth noting that you can also create aliases for these variables, which proves especially beneficial when dealing with nested `@for` blocks.

| Variable | meaning                                       |
| -------- | --------------------------------------------- |
| `$count` | Number of items in a collection iterated over |
| `$index` | Index of the current row                      |
| `$first` | Whether the current row is the first row      |
| `$last`  | Whether the current row is the last row       |
| `$even`  | Whether the current row index is even         |
| `$odd`   | Whether the current row index is odd          |

## Performance improvements

During each change detection cycle in Angular, when a component contains a repeater (such as an `@for` block), Angular employs a comparison algorithm to identify differences between the previous and the current iterable set. This algorithm plays a crucial role in optimizing the rendering process by reducing the number of costly changes that would otherwise be applied to the DOM.

In previous versions of Angular before version 17, this comparison algorithm was recognized as a significant performance bottleneck in various performance benchmarks. It had the potential to negatively impact the efficiency of Angular applications, particularly when dealing with large datasets or frequent updates.

With the introduction of the new syntax in version 17, the Angular team took the opportunity to revisit and enhance this comparison algorithm. The goal was to make it more efficient and responsive to changes in the iterable data, ultimately improving the overall performance of Angular applications. This optimization is an essential part of the "performance-first" approach adopted in Angular version 17, ensuring that change detection and rendering are as efficient as possible when working with repeaters.

The following benchmark compares Angular with its previous self and now compared to other famous and performant frameworks.

| v16 `ngFor` - vs - v17 `@for`                                                                                                                                                                                     | Angular v17 vs other frameworks                                                                                                                                                    |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <div style="width:400px">[![v16 vs v17 diffing performance comparison](src/content/posts/2023-11-03-performance-for-repeaters/16-17.png)](src/content/posts/2023-11-03-performance-for-repeaters/16-17.png)</div> | [![Angular compared with other framworks](src/content/posts/2023-11-03-performance-for-repeaters/fw-comp.png)](src/content/posts/2023-11-03-performance-for-repeaters/fw-comp.png) |

### Performance first

The comparison algorithm used in Angular relies on the track property to establish a connection between an item in the iterated array and its corresponding DOM element. In previous versions, particularly with the `ngFor` directive, setting a `trackBy` function was both optional and somewhat cumbersome. By default, the behavior associated the DOM element to the item's reference, which led to significant performance challenges, especially when working with immutable datasets. Any change to one or more objects resulted in the comparison algorithm associating the item with a DOM node, necessitating the deletion and recreation of DOM elements.

With the new `@for` block in version 17.0, a "performance-first" approach was chosen for the `track` option, and as a result, this property is now mandatory within the `@for` block. This means that developers are now responsible for explicitly specifying how the algorithm should compare objects within the array provided to the `@for` block.

Developers have several options to choose from when setting the track property within an @for block. The choice of tracking option depends on the specific characteristics of the data and the requirements of the application. Let's consider the example `@for(item of list) { ... }`:

| identity                                                                                                                 | $index                                                                                                             | ID                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| `track: item`                                                                                                            | `track: $index`                                                                                                    | `track: item.id`                                                                               |
| <ul>           <li> Was the default in ngFor `trackBy`  </li><li>Good option only if you don't use immutability</li><ul> | <ul><li>When in doubt, its a good default</li><li>Will mess things up if items are sorted/moved/replaced</li></ul> | <ul><li>The most flexible/reliable one</li><li>requires a unique identifier per item</li></ul> |

The identity tracker, which was the default in `ngFor`, has major performances issues when using immutable datasets. Since references change on each mutations, the framework will have to delete/created the DOM node on every change which is a costly operation. So this one should be avoided in favor of better alternatives (except for JS primites like `number`,`string` etc.).

A good default could be index based tracking. The comparison uses the index to match each item to its DOM element. It works great when item are not moved/reorganized within the array.

```ts
@Component({
  template: `
  <h3>Should change every second but doesn't as often</h3>
  @for(item of arr; track $index) {
    <div>id: {{item.id}}</div>
  }`,
})
export class AppComponent {
  arr = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
  constructor(vcr: ViewContainerRef) {
    setInterval(() => {
      this.arr = this.arr.sort((a, b) => 0.5 - Math.random()); // random shuffle
    }, 1000);
  }
}
```

This example (also [avalable on stackblitz](https://stackblitz.com/edit/angular-for-track-index-sort?file=src%2Fmain.ts%3AL23)) demo what can go wrong when `index$` breaks the rendering by wrongly not updating some nodes. replacing `$index` by `item` or `item.id` fixes the issue here.  

So while it works, you see this not THE perfect default value.

Probably the most recommended solution will be to track a unique identifier. Referring to a unique ID brings flexibility to item tracking. Whatever happens to the object (mutability or immutability). Unfortunately this only works for structures with unique identifiers and if the data structure wasn't designed with them in mind it might require some refactoring.

So you see that there isn't a perfect solution and it's up to the developer to understand the implication of the chosen track property. But one is sure, by designing it with a "performance-first" approach we make it explicit in the control flow what is going to happen under the hood.

### About the migration schematics

As we discuss the new `@for` block, it's important to note that there are migration schematics available (accessible via `ng generate @angular/core:control-flow`) that assist in transitioning from directive-based control flow to the new "@-syntax" control flow. These migration schematics have built-in support for handling the optional `trackBy` attribute during the migration process.

Here's how the migration process is handled:

* **No `trackBy` attribute**: In cases where the original code lacks a `trackBy` attribute, the migration schematics will automatically set the track property to item, which mirrors the behavior of previous Angular versions. This simplifies the migration process for situations where developers haven't explicitly defined a `trackBy` function.
* **`trackBy` attribute is present**: When the code contains a `trackBy` attribute, the migration tool will retain the function and invoke it as specified (`track: myTrackByFn($index, item)`). This ensures that the tracking logic defined in the `trackBy` function is preserved in the new `@for` block, maintaining the desired tracking behavior for the iterable data.

The effort put into creating these migration tools is truly commendable. They greatly assist developers in smoothly transitioning to the new @-syntax control flow while preserving their existing tracking logic. This reflects the Angular team's commitment to enhancing the developer experience and simplifying the process of upgrading, and they deserve significant praise for their work in this area! 💯

## Providing feedback

The new control flow syntax is landing in v17 as a developer preview. This stabilisation phase allows the Angular core team to collect valuable feedback and refine the implementation of the new APIs.

The requirement of the `track` property has the potential to create some friction among certain developers, as it represents a significant behavior change. If you have insightful feedback or thoughts regarding whether it should be mandatory, optional, or have fallback options, there is an [open issue](https://github.com/angular/angular/issues/52050) dedicated to this discussion. Your input and suggestions are welcome and can contribute to the ongoing improvement of this feature.
