import { repeatFunc, repeatAsyncFunc } from 'repeat-func'; 

function delay(milliseconds, count) {
    return new Promise(resolve => {
            setTimeout(() => {
                resolve(count);
            }, milliseconds);
        });
}

const testRepeatFuncWithSingleArg = () => {
    let n = 5;
    let x = 0;

    const f = (n) => {
        return n += 1;
    }

    x = repeatFunc (n) (f, x)

    if (x != n) {
        throw new Error(`repeatFunc is failing: ${x} does not equal ${n}`);
    }
}

const testRepeatFuncWithArrayArg = () => {
    let n = 5;
    let x = [1, 2, 3];

    const f = (n) => {
        return n += 1;
    }

    x = repeatFunc (n) (f, x)
    
    if (x[0] != 6 && x[1] != 7 && x[2] != 8) {
        throw new Error(`repeatFunc is failing: ${x} does not equal [6, 7, 8]`);
    }
}

const testRepeatFuncWithoutArg = () => {
    let n = 5;

    const f = () => {
        true;
    }

    repeatFunc (n) (f);
}

const testRepeatFuncWithBadArg1 = () => {
    let n = -10;

    const f = () => {
        true;
    }

    repeatFunc (n) (f);
}

const testRepeatFuncWithBadArg2 = () => {
    let n = "Hello!";

    const f = () => {
        true;
    }

    try {
        repeatFunc (n) (f);
    }
    catch (e) {
        if (e instanceof TypeError) {
            true;
        }
    }
}

const testRepeatAsyncFuncWithSingleArg = async () => {
    let n = 5;
    let x = 0;

    const f = async (n) => {
        await delay(500, n);
        return n += 1;
    }

    x = await repeatAsyncFunc (n) (f, x);

    if (x != n) {
        throw new Error(`repeatAsyncFunc is failing: ${x} does not equal ${n}`);
    }
}

const testRepeatAsyncFuncWithArrayArg = async () => {
    let n = 5;
    let x = [1, 2, 3];

    const f = async (n) => {
        await delay(500, n);
        return n += 1;
    }

    await repeatAsyncFunc (n) (f, x).then((arr) => {
        if (arr[0] != 6 && arr[1] != 7 && arr[2] != 8) {
            throw new Error(`repeatAsyncFunc is failing: ${x} does not equal [6, 7, 8]`);
        }
    })
}

const testRepeatAsyncFuncWithoutArg = async () => {
    let n = 5;

    const f = async () => {
        await delay(500, 0);
        true;
    }

    await repeatAsyncFunc (n) (f);
}

const testRepeatAsyncFuncWithBadArg1 = async () => {
    let n = -10;

    const f = async () => {
        await delay(500, 0);
        true;
    }

    await repeatAsyncFunc (n) (f);
}

const testRepeatAsyncFuncWithBadArg2 = async () => {
    let n = "Hello!";

    const f = async () => {
        await delay(500, 0);
        true;
    }

    try {
        await repeatAsyncFunc (n) (f);
    }
    catch (e) {
        if (e instanceof TypeError) {
            true;
        }
    }
}

try {
    testRepeatFuncWithSingleArg();
    console.log("testRepeatFuncWithSingleArg passed")

    testRepeatFuncWithArrayArg();
    console.log("testRepeatFuncWithArrayArg passed")

    testRepeatFuncWithoutArg();
    console.log("testRepeatFuncWithoutArg passed")

    testRepeatFuncWithBadArg1();
    console.log("testRepeatFuncWithBadArg1 passed")

    testRepeatFuncWithBadArg2();
    console.log("testRepeatFuncWithBadArg2 passed")

    await testRepeatAsyncFuncWithSingleArg();
    console.log("testRepeatAsyncFuncWithSingleArg passed");

    await testRepeatAsyncFuncWithArrayArg();
    console.log("testRepeatAsyncFuncWithArrayArg passed")

    await testRepeatAsyncFuncWithoutArg();
    console.log("testRepeatAsyncFuncWithoutArg passed")

    await testRepeatAsyncFuncWithBadArg1();
    console.log("testRepeatAsyncFuncWithBadArg1 passed")

    await testRepeatAsyncFuncWithBadArg2();
    console.log("testRepeatAsyncFuncWithBadArg2 passed")
} catch (e) {
    throw new Error(e);
}
