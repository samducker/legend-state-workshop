---
theme: default
highlighter: shiki
transition: none
mdc: true
defaults:
    layout: center
    transition: slide-up
---

# Using Legend State

<div class="absolute bottom-16">
  <div>Jay Meistrich</div>
  <div class="pt-1">🦋 @jayz.us</div>
  <div class="pt-1">&nbsp;𝕏 @jmeistrich</div>
  <div class="text-gray pt-1">React Native London - Nov 14, 2024</div>
</div>

---

## Observable

```ts
import { observable } from '@legendapp/state';

// Observable objects
const state$ = observable({
    fname: 'Annyong',
    lname: 'Bluth',
});

// Or small individual atoms
const fname$ = observable('Annyong');
```

## Observing

```ts
const state$ = observable({
    fname: 'Annyong',
    lname: 'Bluth',
});

observe(() => {
    // Tracks
    const fname = state$.fname.get();

    // Does not track
    const fname = state$.fname.peek();
});
```

## Setting

No immutables!

```ts
const state$ = observable({
    fname: 'Annyong',
    lname: 'Bluth',
    arr: ['banana'],
});

// Set
sate$.fname.set('Hello');

state$.assign({
    fname: 'Hello',
});

state$.arr.push('chocolate');
```

## Computed observables

```ts
const state$ = observable({
    fname: 'Annyong',
    lname: 'Bluth',
    name: () => state$.fname.get() + ' ' + state$.lname.get(),
});

const name$ = observable(() => state$.fname.get() + ' ' + state$.lname.get());
```

## React

```tsx
import { observable } from '@legendapp/state';
import { use$ } from '@legendapp/state/react';

const state$ = observable({
    fname: 'Annyong',
    lname: 'Bluth',
    name: () => state$.fname.get() + ' ' + state$.lname.get(),
});

function Component() {
    const name = use$(state$.name);

    return <Text>{name}</Text>;
}
```

<!--
For those of you who have used Legend State before, this will look different. I'm actually in the process now of changing usage in React to favor this use$ hook, so I'm encouraging using that now.

The previous method of observer components tracking all get() calls wasn't compatible with the React Compiler. So we'll use this instead, which is the same number of characters :). And observer will still be useful to optimize all use calls into a single actual hook.
-->

## React Local state

```tsx
import { use$, useObservable } from '@legendapp/state/react';

function Component() {
    const state$ = useObservable({
        fname: 'Annyong',
        lname: 'Bluth',
        name: () => state$.fname.get() + ' ' + state$.lname.get(),
    });

    const name = use$(state$.name);

    return <Text>{name}</Text>;
}
```
