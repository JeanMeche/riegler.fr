---
title: 'The inject function is not a service locator'
excerpt: 'Except when you make one of it'
coverImage: 'src/content/posts/2025-01-08-inject-not-service-locator/valeriia-miller-5y1rtaIKBj0-unsplash.jpg'
coverCredit: 'Photo by <a href="https://unsplash.com/@valeriiamiller">Valeriia Miller</a> on <a href="https://unsplash.com/photos/a-sign-that-says-discovery-more-under-a-tree-5y1rtaIKBj0>Unsplash</a>'
date: '2025-01-07T00:00:00.000+02:00'
private: true
---


I wanted to shared my take on a debated topic withing the Angular community: Dependency injection with the `inject()` function.


## The Service Locator Pattern

The **Service Locator Pattern** is a design pattern used in software development to manage the instantiation and provisioning of dependencies within an application. It involves a central registry, known as the Service Locator, which holds references to various services or objects. Instead of components directly creating or depending on other objects, they query the Service Locator to retrieve the required dependencies. This approach aims to decouple components and simplify dependency management, making it easier to swap out or configure services without modifying the consuming code. Service Locator is commonly used in scenarios where dependency injection frameworks or configuration-based instantiation is desired.

### Why the Service Locator is Considered an Anti-Pattern

While the Service Locator pattern might seem convenient, it is often criticized and regarded as an anti-pattern for several reasons:

1. **Hidden Dependencies**: The use of a Service Locator obscures the dependencies of a class, making them less explicit. This lack of transparency can lead to difficulties in understanding and maintaining the codebase since developers cannot immediately discern what a class depends on.

2. **Violation of Dependency Inversion Principle**: By relying on a centralized locator, components depend on the Service Locator itself rather than abstract interfaces, creating an implicit coupling. This undermines the principle of depending on abstractions rather than concrete implementations.

3. **Testing Challenges**: The pattern introduces global state-like behavior, making it harder to isolate and test components. Mocking or replacing dependencies during testing requires additional effort, often necessitating special configuration for the Service Locator.

4. **Runtime Failures**: Since dependencies are resolved at runtime, issues such as missing or misconfigured services might only surface when the application is running, making debugging more challenging.

5. **Encouragement of Poor Design**: The pattern can encourage a lack of structure in dependency management, as developers might use the locator to retrieve dependencies anywhere in the code, leading to tightly coupled and less modular systems.

For these reasons, the **Dependency Injection** (DI) pattern is generally preferred, as it makes dependencies explicit, encourages adherence to SOLID principles, and simplifies testing and maintainability.

## Why the `inject` function in Angular is Dependency Injection and not a Service Locator

In Angular, the `inject` function is used to retrieve dependencies in a declarative manner within functions like constructors, standalone components, or during initialization. While it might seem similar to a Service Locator at first glance, it fundamentally aligns with the principles of **Dependency Injection (DI)** rather than being a Service Locator. Here's why:

1. **Dependencies Are Explicit**: 
   Unlike the Service Locator pattern, where dependencies are hidden and can be accessed anywhere in the codebase, Angular's `inject` function makes dependencies explicit. It is scoped to the context in which it is used, such as within a specific provider or component, ensuring clarity about what is being injected.

2. **Framework-Controlled Resolution**: 
   Angular's DI system is framework-controlled. The `inject` function works within the constraints of Angular's DI container, which resolves dependencies based on configuration. The developer defines providers in at the root level, routes or components, and Angular handles the lifecycle and scoping of these services.

3. **No Global Access**: 
   A hallmark of the Service Locator pattern is the global access to dependencies through a centralized registry. In Angular, `inject` is tightly coupled to Angular's hierarchical DI system, ensuring dependencies are resolved only within the appropriate context. This hierarchical nature avoids the global access issues associated with Service Locators.

4. **Adherence to the Dependency Inversion Principle**: 
   With `inject`, dependencies can be resolved based on abstract tokens rather than concrete implementations. This design aligns with the Dependency Inversion Principle, as the code depends on abstractions provided by Angular's DI system.

In summary, the `inject` function in Angular is a tool provided by Angular's Dependency Injection system to resolve dependencies within a controlled and explicit framework context. It avoids the pitfalls of the Service Locator pattern by adhering to DI principles, ensuring testability, and providing a clear and structured way to manage dependencies.

## How `inject()` becomes a Service Locator

### Why `runInInjectionContext` is risky when used improperly

`runInInjectionContext` can inadvertently transform Angular's dependency injection system into a service locator pattern when misused. Here's a detailed examination of the risks and best practices.

#### The Core Issue

`runInInjectionContext` allows code execution within an injection context outside of Angular's normal boundaries. While flexible, this can lead to problematic patterns:

```typescript
import { runInInjectionContext, inject, Injector } from '@angular/core';

export class RiskyService {
  private injector: Injector;

  // This creates a hidden dependency outside of construction
  someMethod() {
    runInInjectionContext(this.injector, () => {
      const httpClient = inject(HttpClient);
      // Use httpClient...
    });
  }
}
```

### Key Risk

The key risk is to have dependencies that are required outside of the construction operation.

While we can capture those dependencies in unit tests, basic unit test that just ensure construction with dependecies might miss that "hidden" dependency.

#### `Dependencies injected outside of construction`
```typescript
@Injectable()
export class ProblematicService {
  private injector = inject(Injector);

  // Dependencies are required much later
  doSomething() {
    return runInInjectionContext(this.injector, () => {
      const service1 = inject(Service1);
      const service2 = inject(Service2);
      // Use services...
    });
  }
}
```

#### Best approach: Use Dependency Resolution during construction operations

```typescript
@Component({
  template: '...'
})
export class BetterComponent {
  private readonly service1 = inject(Service1);
  private readonly service2 = inject(Service2);
  // Dependencies are clearly visible at the class level

  // toSignal requires an injection context, 
  // Because it will inject DestroyRef
  private someSignal = toSignal(someObservable$); 
}
```

While `runInInjectionContext` is a powerful tool, its improper use can lead to maintenance nightmares and testing difficulties. By following the guidelines above and preferring constructor injection when possible, you can maintain a cleaner and more maintainable codebase.

## Angular's internal use of `inject` 

... TODO

## Conclusion

The classification of Angular's `inject()` function as a Service Locator pattern or not is a matter of perspective and implementation. While it shares characteristics with traditional Service Locator patterns by allowing runtime service resolution, its integration within Angular's dependency injection framework gives it a unique position.

Like many patterns in software development, the line between a useful pattern and an anti-pattern often depends on how and where it's applied. The key isn't to definitively categorize `inject()` as either a Service Locator or not, but rather to understand the contexts where its usage could lead to the common pitfalls associated with Service Locators.

Understanding these potential pitfalls - such as hidden dependencies, testing difficulties, and temporal coupling - allows developers to make informed decisions about when and how to use `inject()`. This knowledge helps maintain the benefits of Angular's dependency injection system while leveraging the flexibility that `inject()` provides.

The pattern itself isn't inherently problematic; rather, it's the implementation and context that determines its impact on code quality. By remaining mindful of these considerations, developers can effectively use `inject()` while avoiding the traditional drawbacks associated with Service Locators.

In the end, the goal isn't to avoid particular patterns but to understand their implications and use them judiciously where they provide clear benefits while maintaining code quality, testability, and maintainability.


<a href="https://www.youtube.com/watch?v=SBhLP3auKhU" target="_blank">

![When you know better, you do better](/src/content/posts/2025-01-08-inject-not-service-locator/stinson-better.gif)
</a>

## References 

I you'd like some references on the Service Locator pattern please have a look : 

* <a href="https://martinfowler.com/articles/injection.html#ServiceLocator"><i>Inversion of Control Containers and the Dependency Injection pattern</i>, on martinFowler.com</a> <br> This is considered the canonical reference that first properly defined the pattern

* <a href="https://blog.ploeh.dk/2010/02/03/ServiceLocatorisanAnti-Pattern/"><i>Service Locator is an Anti-Pattern</i>, Mark Seemann's critical analysis</a><br>
Provides important counterpoints and explains why some consider it an anti-pattern