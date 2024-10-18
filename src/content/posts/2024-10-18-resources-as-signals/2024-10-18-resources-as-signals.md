---
title: 'Resource: async loading with signals'
excerpt: 'Who said you needed an effect ?'
coverImage: 'src/content/posts/2024-10-18-resources-as-signals/matthew-ball-36uvcx49pCs-unsplash.jpg'
coverCredit: 'Photo de <a href="https://unsplash.com/fr/@tex450"">Matthew Ball</a> sur <a href="https://unsplash.com/fr/photos/une-haute-tour-dans-un-champ-36uvcx49pCs">Unsplash</a>'
date: '2024-10-18T00:00:00.000+02:00'
---

Defining APIs and patterns around them is a task that requires time, feedback loops and taking a step back.
As the Signal APIs mature in Angular (most of them are being promoted to stable in v19, exception of `effect`), it
becomes time to have a look at more advanced patterns.

The usage of `effect` has been a debated topic, Alex Rickabaugh, the framework lead of the Angular Team has been pretty vocal on [recommending to use them as less as possible](https://www.youtube.com/watch?v=aKxcIQMWSNU).
There are alternatives, often abstractions on top of if which express more the intention of the developers.

## Introducing the `resource` API.

The `resource` API is one of those APIs that is intended to abstract the usage of `effect` and provide a more declarative signal-based API
for asynchronous loading of data.

As a bare minimum `resource` requires a `loader` that returns async data and returns an `WritableResource` wrapper object.
The `loader` function is invoked eagerly (as part of an `effect`).

```ts
import {resource} from '@angular/core';

@Component({
  template: `
    value: {{ myResource.value() }}
  `,
})
export class MyComponent {
  myResource: WritableResource = resource({
    loader: () => {
      return Promise.resolve('My data is loaded');
    },
  });
}
```

This example will display nothing (`undefined`) until the data is loaded and `My data is loaded` once the promise is resolved.

## The loading status as a key information

When we are loading data asynchronously, it is important to keep track of our loading status.
Is it loading ? Is it done ? Did I get an error ?

Famously, having a `isLoading` boolean is considered an anti-pattern as it lacks a lot of information around it.

A `WritableResource` holds 3 key information.

- `value`, a signal wrapped value for the loaded
- `status`, a signal wrapped value of the loading status (`'idle' | 'error' | 'loading' | 'refreshing' | 'resolved' | 'local'`)
- `error`, a signal wrapped object for the details of the error, loading resulted in an error.

If we capture this in an `effect` we would observe following:

#### `Capturing resource changes`

```typescript
effect(() => {
  console.log('value: ', this.myResource.value());
  console.log('status: ', this.myResource.status(), myResource.status());
  console.log('error: ', this.myResource.error());
});
```

#### `Output`

```text
value: undefined
status: 0 Idle
error: undefined

value: 'My data is loaded'
status: 3 Resolved
error: undefined
```

## Fetching data

You'll probably reach out to `resource` for fetching async data over HTTP, but it could be any other async API that is promised based.
Let's take an example using `fetch`.

### `Basic fetch resource example`

`fetch` returns a promise which is passed to `resource` as the loader. The `fetch` request emitted instantly (as part of an `effect()`) without
any template or additional `effect` consuming the `WritableResource`.

```ts
postResource = resource({loader: () => fetch(`https://dummyjson.com/posts/1`)});
```

## Reacting to signal changes

One of the missing building pieces has been about reacting to signal changes and reloading data as a consequence.
The `resource` API addresses this requirement by declaring dependencies as part of a `request`.

### Listening to a signal change

The dependencies are declared as part of the `request` callback.

```ts
postResource = resource({
  request: this.postId, // this could be one of your signal inputs
  loader: ({request: postId}) => return fetch(`https://dummyjson.com/posts/${postId}`),
});
```

Signals read as part of the loader callback will not trigger further loading upon changes
(The `loader`'s execution is `untracked`).

If you're asking yourself why the loader function isn't tracked, it's because the async part of the loader function wouldn't be tracked.
So to make it more clear reactivity-wise, the reactive part (the `request`) was separated for the loading part (the `loader`).

#### `If the loader was a reactive context`
```ts
postResource = resource({
  request: () => this.postId(),
  loader: async ({request}) => {
    // signals can be tracked
    const response = await fetch(`https://dummyjson.com/posts/${request}`);
    const result = await response.json();
    // signals can't be tracked
  },
});
```

### Listening to multiple signal changes

A more realistic use case would be to listen to multiple signal at once and react to the change
of each of them.

```ts
postResource = resource({
  request: () => ({limit: this.limit(), filter: this.filter(), select: this.select()}),
  loader: ({request: {limit, filter, select}}) => {
    return fetch(`https://dummyjson.com/posts/search?q=${filter}&limit=${limit}&select=${select}`);
  },
});
```

### Skipping requests

The loader is conditionnaly firing depending on the request itself. If it returns `undefined`, the loader won't fire.
This way you can skip some request (the status remains `idle` until the first request fires).

```ts
postResource = resource({
  request: () => (this.postId() > 5 ? this.postId() : undefined),
  loader: ({request}) => {
    return fetch(`https://dummyjson.com/posts/${request}`).then((res) => res.json());
  },
});
```

### Complete fetch resource example

More realisticaly, we'll parse the response as JSON and might want to plug-in the `abortSignal`.
The `abortSignal` will be used to cancel the pending request when one of the signals receives a new value.

```ts
postResource = resource({
  request: () => ({limit: this.limit(), filter: this.filter(), select: this.select()}),
  loader: ({request: {limit, filter, select}, abortSignal}) => {
    return fetch(`https://dummyjson.com/posts/search?q=${filter}&limit=${limit}&select=${select}`, {
      signal: abortSignal,
    }).then((res) => res.json() as Promise<Post[]>);
  },
});
```

## Refreshing the data

In the case that your resource data gets invalidated on the server, imagine deleting a post for example, you'd like to refresh your local data
to get the latest state from the server. For this you'll reach out to the `reload()` method.

If your resource isn't already loading (`status() === 'loading'`), `reload()` will set your resource status
to `'reloading'`, and send a new request.
In the meantime, your resource will keep its previous value until the new one is received.

```ts
import {resource} from '@angular/core';

@Component()
export class MyComponent {
  postResource = resource({
    loader: () => {
      return fetch(`https://dummyjson.com/posts/search?limit=${limit}`).then(
        (res) => res.json() as Promise<Todo[]>,
      );
    },
  });

  /* Invalidate local data & request the new state */
  reload() {
    this.postResource.reload();
  }
}
```

If you want to cancel any pending request, `reload()` it not tool you're looking for.
`resource` will cancel any request on dependency changes. Those are expressed as signals in the `request` property.

## Resource as a writable local state

When using the `resource` API, you'll create an use a `WritableResource`. This `WritableResource` represent a local state
of a resource on your server.

This state is also writable locally, `WritableResource.set()` will allow you to programmatically set the local value.
Overwriting the value of a resource sets it to the `status` signa to `'local'`.

If you want to expose this resource as readonly, `WritableResource.asReadonly()` will return a readonly `Ressource` that can be shared with other parts of your application which risking exposing the writable behavior.

## RxJS as a first-class citizen: `rxResource`

It has already been mentioned by the Angular team multiple times, RxJS is a first class citizen and
while Angular shouldn't require you to learn/use RxJS, using RxJS with Angular should feel like a natural, polished experience.

As of now, we only discussed `resource` as a Promise-based API. v19 will also introduce its `Observable` based counterpart: `rxResource` from the `@angular/core/rxjs-interop` module.

### Observable based example

```ts
import {rxResource} from '@angular/core/rxjs-interop';

@Component()
export class MyComponent {
  postResource: WritableResource = rxResource({
    request: () => this.postId(), // this could be one of your signal inputs
    loader: (limit) => {
      return this.http.get<Post>(`https://dummyjson.com/posts/${postId}`);
    },
  });
}
```

The same way as `resource`, `rxResource` returns a `WritableResource`.
Everytime the signals registered in the `request` change, the loader (here the http request) will be re-emit and it will update the `WritableResource` and its signals.

#### Single emittion gotcha

It is important to note that if the observable returned to the loader emits multiple value, only the first one will be passed to the resource.
This is due to the fact that resource has no way to know when a new request is starting before it actually recieves the new value.

#### `not a pulling example`

```ts
postResource: WritableResource = rxResource({
  request: () => this.postId(), // this could be one of your signal inputs
  loader: (limit) => {
    return interval(1000).pipe(this.http.get<Post>(`https://dummyjson.com/posts/${postId}`));
  },
});
```

This example will not implement a signal-based pulling. As mentionned before, only the first value will be passed to the resource.
A new request will only be emitted when the `postId` signal is emitted.

## Last words

The `resource` API and its interop counterparts are released as [experimental APIs](https://angular.dev/reference/releases#experimental).
This means that they might not become stable at all or have significant changes before becoming stable.

Feel free to report [any feedback](https://github.com/angular/angular/issues/new) to the team.
