---
title: "Typescript typing tricks"
excerpt: "Nice Typscript typing you might not know ! (And will make you 💙 TS)"
coverImage: "blog/ts-tricks/cover.png"
date: "2022-08-27T00:00:00.000Z"
updated: "2022-09-01T00:00:00.000Z"
ogImage:
  url: "assets/blog/ts-tricks/cover.png"
---

# Nice TS tricks I learned you might like

## Assert unreachable path a compiler time

```typescript
function assertUnreachable(x: never): never {
  throw new Error("Didn't expect to get here");
}

function foo(val: 1 | 2 | 3) {
  switch (val) {
    case 1:
    case 2:
    case 3:
      return;
    default:
      assertUnreachable(val); // compilation error if a case isn't covered before
  }
}
```

[Playground](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABAQwM6oKYCcoFUxYbIQAWyARgDYYAUAHgFyJgYBu2AlEy+1ogN4AoRCMRQSWOAHdmGGQFEskrDQBEAERgATMAHIoiDHQAOGaGLiIA5hgMlsGVRwDcggL6DBoSLASJgcHA0rMiUTACMiAA+iABM0YgAzBwCwqKoUjBQpIjBoSlCokWIEGgYiOEMacUlZXFVNTWEUCBYYM6I1cVaGMDIIJRQDY1FaJg4+ITEZFS0IZQpAPSLJXAAtsYwlMi+SNjKiDDAKLWYh6h6BhBwvBhaiOS9cIRdHm5AA)

## An Array type with at least N elements

```typescript
type ArrayOfTwoOrMore<T> = [T, T, ...T[]];

type TwoOrMoreStrings = ArrayOfTwoOrMore<string>;

declare const myStrings: TwoOrMoreStrings;

const foo = myStrings[0]; // string
const bar = myStrings[1]; // string
const bar = myStrings[2]; // string | undefined
```

[Playground](https://www.typescriptlang.org/play?noUncheckedIndexedAccess=true&jsx=0#code/C4TwDgpgBAggTnAhiA8gMwCoHcD2K4CyOcEAPBgHxQC8UA2hgDRRNQB0HGdAutwNwBYAFDDQkFrnxESAZWBwAlgDsA5gGcasBMnTY8hYmTXzlKisOEATCAGMANohJQbOJcagBbEHMWq1ALj0pQx9TNUERIRc3YCg0HBxNL1C-OgAGfmEAeiyoPKgAPQB+CyjXdwAjRyTvE1SARkyhHPzCksjoysQALxqU9ToAZiaW-OLhIA)

This one is useful particularly with `noUncheckedIndexedAccess` enabled !

## Removing/Removing types from an array type

### Removing first item

```typescript
type RemoveFirst<T extends Array<unknown>> = T extends [unknown, ...infer rest] ? rest : never;
```

[Playground](https://www.typescriptlang.org/play?jsx=0#code/C4TwDgpgBAShC2B7AbhAYgSwE4GdgB4AVKCAD2AgDsATHKAQSywEMR8BXSga0sQHdKAPkFQAvFGJkKNOgG1OPfpQA0UAHQaMlAGYQsULBDwBdKAH4DR4FABcUShFRYA3AFgAUB9CQoaRIjFYBBR0bDx8WQAjfwAbCGYVKDwsLQBzVUp2eEi9Y0EPAHoCqBKAPTMgA)

### Removing n first items

```typescript
type RemoveFirstNItems<T extends unknown[], N extends number, Removed extends unknown[] = []> = Removed["length"] extends N ? T : T extends [infer First, ...infer Rest] ? RemoveFirstNItems<Rest, N, [...Removed, First]> : never;
```

[Playground](https://www.typescriptlang.org/play?jsx=0#code/C4TwDgpgBAShC2B7AbhAYgSwE4GdgDkBJYBHAHgBUoIAPEgOwBMcoBXega3sQHd6BtALoAaKPmp0ITFvVbwARhCyi4SVIwkNmbTtz5CoAXihCAfEYCwAKCi3YCFBEb8A5ABspAc2AALF4M0pbXxrOygAfigKULsALijA6RMMegAzJShMXGBRADp8lPSsezxBGNtI1UcsvCISeHI4PFF8UX583Kr1URrgQVNyqHj6CFQsAG5rKatQSCiARiN7NXRsWuJSMn5ZBSVRPCwUz1EdxWUoA6ORKAAmAasAege7AD1w61noChulrtXsuqbfjzUTsRgQVIpJyiG7XAAM9yer3eM3AXwAzL8HKheoCGlsQbdROjRAAWa6kxHPWxvD5oqKkrErXEbfHAmHEsnXACsVORQA)

### Removing undefined from Array

```typescript
type FilterUndefined<T extends unknown[]> = T extends [] ? [] : T extends [infer H, ...infer R] ? (H extends undefined ? FilterUndefined<R> : [H, ...FilterUndefined<R>]) : T;
```

[Playground](https://www.typescriptlang.org/play?jsx=0#code/C4TwDgpgBAYglgG2BATgVQHYBMIDM4YRYA8AKlBAB7LYDOUArhgNYYD2A7hgNoC6AfFAC8UclRpZ6fKAH4o0gFyiK1CHXkFcqKAAkANFAB0xzdoBKvWbpUT6THPkJYr8JKkwOCRYmcFLu+kbGrsjo2HheJL6WSqQAsABQiaCQogCMwrCIoR4RTsTcGAwAtgBGqAa0wCgEAOYG9nlEBkVlqAJQUAD0XfKt5SiV1XUtJQO8yeDQpABMmSHu4Y7e3GkNS5EGMx098mtQ25OppADM89mLnvncjctYWzu93IcJKdMALOduYVcrM+u-LCPeQvN6iACsXxyG2ut02jBhzQOwOeE1eU1EADYoZcmiQboigYJdnwjtMAOw4n54goo3hAA)

## Unions

### Union of nested key

```typescript
type AllUnionMemberKeys<T> = T extends any ? keyof T : never;
type AB = { a: string } | { b: string };
type ABnever = keyof AB; // never
type ABKey = AllUnionMemberKeys<AB>; // 'a' | 'b'
```

[Playground](https://www.typescriptlang.org/play?jsx=0&ssl=6&ssc=13&pln=1&pc=1#code/C4TwDgpgBAShC2B7AbhAYgSwE4GdgDkBJYBHAHgBUoIAPEgOwBMcoBXega3sQHd6BtALoAaKPmp0ITFvVbwARhCyi4SVIwkNmbTtz5CoAXihCAfEYCwAKCi3YCFBEb8A5ABspAc2AALF4M0pbXxrOygAfigKULsALijA6RMMegAzJShMXGBRADp8lPSsezxBGNtI1UcsvCISeHI4PFF8UX583Kr1URrgQVNyqHj6CFQsAG5rKatQSCiARiN7NXRsWuJSMn5ZBSVRPCwUz1EdxWUoA6ORKAAmAasAege7AD1w61noChulrtXsuqbfjzUTsRgQVIpJyiG7XAAM9yer3eM3AXwAzL8HKheoCGlsQbdROjRAAWa6kxHPWxvD5oqKkrErXEbfHAmHEsnXACsVORQA)

### About unions

A union of functions it is only safe to invoke it with an intesection of parameters which in this case resolves to never

```typescript
type Foo = ((foo: number) => void) | ((foo: string) => void);

declare const foo: Foo;

foo(); // can't call it
```

[Playground](https://www.typescriptlang.org/play?jsx=0#code/C4TwDgpgBAYg9nKBeKAKVAzBAuKA7AVwFsAjCAJwEpkA+KANzgEsATagHzUxygGdhyTPAHNqSOo1aUAsACg5LCAGMANgENy0JXDz8oWOLnhwA3HLkHU1APTWoStXgDkwe2pUqoTYHNsA9AH5zWVBIKAAhBGQuA1wAbyg1ANx+QREAGigSFIEhYRMoAF8xCWY2KE50Eg14rJy04UylZL5ckSKShjKZWUVVDS0dPWryXEjTORHUBOyoJycOoA)

In short, using a union of function is usually a bad idea.

## Literal templates

### Ensure a binary string

```typescript
type BinDigit = "0" | "1";

type OnlyBinDigit<S> = S extends "" ? unknown : S extends `${BinDigit}${infer Tail}` ? OnlyBinDigit<Tail> : never;

type BinDigits = string & { __brand: "onlydigits" };

declare function onlyBinDigit<S extends string>(s: S & OnlyBinDigit<S>): BinDigits;

const a = onlyBinDigit("01010101010011"); // OK
const notBin = onlyBinDigit("010101012"); // NOK
```

[Playground](https://www.typescriptlang.org/play?jsx=0#code/C4TwDgpgBAQglgOwCJwOZ2FAvFARABlygB88BGXAWACgbRIoB5BAGxHmTQwB4BlAPmw0oIqLygQAHsAgIAJgGc8VaqKgB+KAFcEAawQB7AO4JhogFxiJ02YqgADACQBvDinTAAvi8QAzCABOUAAqAIZwLJ72ZiKazGxuXMDcYRH8MVCWCBAAboE0BdT00IkeSjgKwAGIqFAAZFDOUAD6zQBGAaHylgDkBqwgckkKPVCehXIQAMYsoQHQvjpTwHD9UP0JiO484lIy8kqV1Qio-AAUCpbiDfHsW0l8-ACUlqUYCgDchVP9lVCh2HWAzewDOBDI+AhUMh+EhFCeHygAHokUwANJQGg-BB-QzADiAjZ3TgeMEw6FkABMuARyNRADlGGigA)

In this case here, using a banded type will ensure that the string is not only a string but a string with only 0/1.

## Basic Generic Factory

```typescript
type ConstructorArguments<T> = T extends new (...args: infer P) => any ? P : never;

class Foo {
  constructor(private foo: string, private bar: number) {}
}

export class Factory {
  public create<T extends new (...args: Array<any>) => any>(constr: T, ...params: ConstructorArguments<T>): InstanceType<T> {
    return new constr(...params);
  }

  public foo() {
    this.create(Foo, "foo", 1);
  }
}
```

[Playground](https://www.typescriptlang.org/play?jsx=0#code/C4TwDgpgBAwg9gOwM7AE4FcDGw6oIKoDm6AthAsEgDwAqAfFALxQ1QQAew5AJklAhADuUABQA6CQEMiSAFxQAlggBmEVFAAKASiYNJCEAFgAUFDNQA-JpPmo8gQDc1AbhMnMAG0lI+AMThwUADeNuaYiCgY2LgiYKgKDpJcUMoB8pFKhAA0UHEJSdAARtL2pIVqOkFQAL4mtcYmHGC4wFCe3n6S0aggwaFmYOiFHgqYbagQBbRsnDx8AsLiUjLyBKiSIFT6IHQ6jHoGdCL9tm0RaPI0WSe2EmJg0pIkcrDnUTj4RKTklLR0J1p5ABJZDAfSYCA0cAQP59UynMwTYDoVAIfhCM6g1BLe6PZ5aVzwsz1E6DYajFIBESVG7mYAACwUSDEmAmBRE-jgOQARKk4NycgBGAknerVIA)

## Unit test the type system & expecting error

Sometimes we want to ensure that some types/parameters are considered invalid.

```typescript
declare function foo(bar: string): void;

foo("3"); // OK

// @ts-expect-error
foo(3); // Also OK
```

But if we change the type of `foo` we'll get following :

```typescript
declare function foo(bar: string | number): void;

// @ts-expect-error <== Unused '@ts-expect-error' directive.
foo(3); // KO

foo("3"); // OK
```

This means, this way we can have tests on the typings only & not relying on the runtime.

## Extending a mapped type

Suppose you need an object with a generic key but also other fixed properties. Unfortunately Mapped types may not declare properties or methods. So the way to go is an intersection !

```typescript
type Pagination<Key extends string, Content> = {
  pagination: {
    total: number;
    page: number;
  };
} & { [K in Key]: Content[] };
type Product = {};

type ProductData = Pagination<"products", Product>;
const productResponse: ProductData = {
  pagination: { total: 100, page: 0 },
  products: [],
};
```

[Playground](https://www.typescriptlang.org/play?#code/C4TwDgpgBACghgcwJYDs7CQexQHgNIQhQQAewEKAJgM5TXABOqCANFAMLbkrAB8UAXigBvALAAoKFKhhEqdFhQAuEROnqowTMDgAbFSgCuAWwBGEBgG41GqbIQQDJ81ZtSAviwnuoAMlWStlAA2nhQqFAEIAC6Kpw8FMDB0daBHhKgkLAMmJSGAMbAgiLuEhng0DA5eYUAIuhwxfDIaBjYOADkYNUFwNQdbFW5vbyp+dj0Mj2FAEoQ1GATjtnDdQ3FYmkycq2KKsKa2noqAIwADGds9stnUJ5uU6t9KslQcLRDNUnRXuLuQA)

---

More coming soon !
