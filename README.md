# SuperSet

## Overview

This library is an extension and upgrade of the JavaScript built-in [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) utility to provide a broader range of set operations. 


### [Set Reference](https://en.wikipedia.org/wiki/Set_(mathematics))

## Feature{Set}

### Set Operations

Each set operation function accepts an [Iterable](./node_modules/typescript/lib/lib.es2015.iterable.d.ts) argument and returns a new `SuperSet` containing the result of the set operation.

**Union**

Performed by calling the `union` function from a `SuperSet` instance. The resulting `SuperSet` will be comprised of a combination of unique values from the calling instance and the `Iterable` argument.

```typescript
const superset = new SuperSet([1, 2, 3, 4]); // {1, 2, 3, 4}
const unionSet = superset.union([5, 6, 7, 8]); // {1, 2, 3, 4, 5, 6, 7, 8}
```

**Relative Complement**

Performed by calling the `complement` function from a `SuperSet` instance. The resulting `SuperSet` will be comprised of all the unique values from the calling instance that do not exist in the `Iterable` argument.

```typescript
const superset = new SuperSet([1, 2, 3, 4, 5]); // {1, 2, 3, 4, 5}
superset.complement([3, 4, 5]); // {1, 2}
```

**Symmetric Difference**

Performed by calling the `difference` function from a `SuperSet` instance. The resulting `SuperSet` will be all of the unique values from the calling instance _and_ the `Iterable` argument not found in the other.

```typescript
const superset = new SuperSet([1, 2, 3, 4, 5, 6]); // {1, 2, 3, 4, 5, 6}
superset.difference([4, 5, 6, 7, 8]); // {1, 2, 3, 7, 8}
```

**Intersection**

Performed by calling the `intersection` function from a `SuperSet` instance. The resulting `SuperSet` will be comprised of all the shared values between the calling instance _and_ the `Iterable` argument.

```typescript
const superset = new SuperSet([1, 2, 3, 4, 5]); // {1, 2, 3, 4, 5}
superset.intersection([3, 4, 5, 6, 7]); // {3, 4, 5}

```

### Comparison

Each comparison function accepts an [Iterable](./node_modules/typescript/lib/lib.es2015.iterable.d.ts) argument and returns a `boolean` result of the assertion.

**Subset Validation**

Performed by calling the `subsetOf` function from a `SuperSet` instance. This function will return `true` if all the members of the calling instance are contained within the `Iterable` argument, `false` if not.

```typescript
const superset = new SuperSet([3, 4, 5]); // {3, 4, 5}
superset.subsetOf([1, 2, 3, 4, 5, 6]); // true
superset.subsetOf([6, 7, 8, 9]); // false

```

**Superset Validation**

Performed by calling the `supersetOf` function from a `Superset` instance. This function will return `true` if al the members of the `Iterable` argument are contained within the calling instance and `false` if not.

```typescript
const superset = new SuperSet([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]); // {1, 2, 3, 4, 5, 6, 7, 8, 9, 0}
superset.supersetOf([1, 3, 5]); // true
superset.supersetOf([10, 11, 12]); // false
```

### Generation

**Cartesian Product**

Accepts an [Iterable](./node_modules/typescript/lib/lib.es2015.iterable.d.ts) argument and returns a [cartesian product](https://en.wikipedia.org/wiki/Cartesian_product) containing `SuperSet`.

Performed by calling the `cartesian` function from a `Superset` instance. This function will return a `SuperSet` of the [cartesian product](https://en.wikipedia.org/wiki/Cartesian_product) `SuperSet x Iterator` between the calling instance and  containing all ordered pairs such that `s` is an element of `SuperSet` and `i` is an element of the `Iterator` argument.

```typescript
const superset = new SuperSet([1, 2]); // {1, 2}
superset.cartesian([3, 4]); // {[1, 3], [1, 4], [2, 3], [2, 4]}
```

**Array**

Performed by calling the `toArray` function from a `SuperSet` instance. This function will return an array of all elements contained within the instance.

```typescript
const superset = new SuperSet([1, 2, 3, 4, 5]); // {1, 2, 3, 4, 5}
const setArray = superset.toArray(); // [1, 2, 3, 4, 5]
```
