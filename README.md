# repeat-func

Avoid using loops with the power of higher order functions! 

`report-func` lets you pass in a function and the number of times you want to call it. 

There are zero dependencies and 100% test coverage including edge cases. Find a bug? Submit a PR! Want another abstraction? Open an issue!

### How to use

```
import { repeatFunc, repeatAsyncFunc } from 'repeat-func';

const helloWorld = () => {
  console.log("Hello, world!");
}

repeatFunc (1) (helloWorld); // Hello, world! 

const addOne = (n) => {
  return n += 1;
}

repeatFunc (10) (addOne, 0);        // 10
repeatFunc (10) (addOne, [1, 2, 3]; // 11, 12, 13

const asyncAddOne = async (n) => {
    await delay(500, n);
    return n += 1;
}

await repeatAsyncFunc (10) (asyncAddOne, 0);         // 10
await repeatAsyncFunc (10) (asyncAddOne, [1, 2, 3]); // 11, 12, 13
```
