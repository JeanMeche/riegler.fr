---
title: 'Signal decision chart'
excerpt: 'What is the right tool for my use case ?'
coverImage: 'src/content/posts/2025-01-12-signal-decision-chart/alex-king-lbwjS4QdpNU.jpg'
coverCredit: 'Photo by <a href="https://unsplash.com/@stagfoo">Alex King</a> on <a href="https://unsplash.com/photos/turn-on-traffic-light-lbwjS4QdpNU">Unsplash</a>
      '
date: '2025-01-12T00:00:00.000+01:00'
---

In Angular v16, signals were introduced as a new reactive primitive to enhance state management and streamline change detection. Signals are functions that hold a value and emit updates when that value changes, enabling fine-grained reactivity without relying on manual subscriptions or complex observables.

With this solid foundation layed out with `signal()`, `computed()` and `effect`, additional primitives we're introduced in the following minor/major versions. 

Amongst other we have today: 
* `input()`, for inputs
* Signal Queries (`viewChild()`, `viewChildren`, `contentChild()`, `contentChildren()`)
* `model()` for double binding 
* `linkedSignal`
* `resource`/`rxResource`
* `afterRenderEffec()` 

Each of those primitives provided by the framework addresses specific usecases. It can become difficult to determine which is the exact tool you are looking for.

Here is a chart that might help you determine what is the tool that your are looking for. 

[![Signal decision chart](/src/content/posts/2025-01-12-signal-decision-chart/signal.png)](/src/content/posts/2025-01-12-signal-decision-chart/signal.png)

<!-- 

```mermaid
flowchart TD
    Reactivity["Do I need reactivity ?"] == &nbsp;No&nbsp;==> NoReact["Does rendering matter ? <br>(Do I access DOM APIs in a non reactive way)"]
    Reactivity == &nbsp;Yes&nbsp; ==> WhichReactivity["Which reactivity system do you need ?"]
    WhichReactivity == &nbsp;Stream/Event Driven&nbsp; ==> RxJS[("RxJS / Observables")]
    WhichReactivity == &nbsp;State Based&nbsp; ==> Signals["Can I derive the value ?"]
    Signals == &nbsp;Yes&nbsp; ==> Derive["Can I derive it synchronously ?"]
    Derive == &nbsp;Yes&nbsp; ==> DeriveSync["Should it be writable ?"]
    DeriveSync == &nbsp;Yes&nbsp; ==> LinkedSignal(["linkedSignal&lpar;&rpar;"])
    DeriveSync == &nbsp;No&nbsp;==> Computed(["computed&lpar;&rpar;"])
    Derive == &nbsp;No&nbsp;==> Resource["What does my loader return ?"]
    Signals == &nbsp;No&nbsp;==> Sure["Are you sure ?"]
    Sure == &nbsp;No&nbsp;==> Signals
    Sure == &nbsp;Yes&nbsp; ==> NonReactive["Am I declaring a side effect on a non reactive API ?"]
    NonReactive == &nbsp;No&nbsp;<br>&nbsp;You can probably derive&nbsp;==> Signals
    NonReactive == &nbsp;Yes&nbsp; ==> SideEffect["When should the side effect run ?"]
    SideEffect == &nbsp;After App rendered&nbsp; ==> AfterRenderEffect(["afterRenderEffect&lpar;&rpar;"])
    SideEffect == &nbsp;Ahead of cmp sync&nbsp; ==> Effect(["effect&lpar;&rpar;"])
    NoReact == &nbsp;Yes&nbsp; ==> n1["Invoke the signal within after(next)Render()"]
    NoReact == &nbsp;No&nbsp;==> n2["Read the signal()"]
    Resource == &nbsp;A Promise&nbsp; ==> n3(["resource()"])
    Resource == &nbsp;An Observable&nbsp; ==> n4(["rxResource"])
    Reactivity@{ shape: hex}
    Resource@{ shape: rect}
    SideEffect@{ shape: rect}
    linkStyle 0 stroke:#D50000, background: #D50000,fill:none
    linkStyle 1 stroke:#00C853, background: #00C853,fill:none
    linkStyle 2 stroke:#00C853, background: #00C853,fill:none
    linkStyle 3 stroke:#00C853, background: #00C853,fill:none
    linkStyle 4 stroke:#00C853, background: #00C853,fill:none
    linkStyle 5 stroke:#00C853, background: #00C853,fill:none
    linkStyle 6 stroke:#00C853, background: #00C853,fill:none
    linkStyle 7 stroke:#D50000, background: #D50000,fill:none
    linkStyle 8 stroke:#D50000, background: #D50000,fill:none
    linkStyle 9 stroke:#D50000, background: #D50000,fill:none
    linkStyle 10 stroke:#D50000, background: #D50000,fill:none
    linkStyle 11 stroke:#00C853,background:#00C853,fill:none
    linkStyle 12 stroke:#D50000, background: #D50000,fill:none
    linkStyle 13 stroke:#00C853,background:#00C853,fill:none
    linkStyle 14 stroke:#424242,fill:none
    linkStyle 15 stroke:#424242,fill:none
    linkStyle 16 stroke:#00C853,fill:none#00C853,background:#00C853,fill:none
    linkStyle 17 stroke:#D50000,fill:nonestroke:#D50000, background: #D50000,fill:none
```
-->

As you can see, this chart assumes that you already know when to reach out for Signals and when/what observable is better suited. 


Note: I'll try to keep this chart up-to-date with new primitives that might be around the corner or when new use cases arrise. 
