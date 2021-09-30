export const repeatFunc = (n) => (f, x=null) => {
    if (typeof(n) != "number") {
        throw new TypeError(`repeatFunc requires a number as an argument. You passed in a ${typeof(n)}.`)
    }

    if (n <= 0) {
        return x;
    }

    if (typeof(x) == null) {
        return repeatFunc (n - 1) (f, null);
    }

    if (Array.isArray(x)) {
        let args = []
        x.forEach((el) => {
            args.push(f(el));
        })
        return repeatFunc (n - 1) (f, args);
    }
    
    return repeatFunc (n - 1) (f, f(x));
}

export const repeatAsyncFunc = (n) => async (f, x=null) => {
    if (typeof(n) != "number") {
        throw new TypeError(`repeatAsyncFunc requires a number as an argument. You passed in a ${typeof(n)}.`)
    }

    if (n <= 0) {
        return x;
    }

    if (typeof(x) == null) {
        return await repeatAsyncFunc(n - 1)(f, null);
    }

    if (Array.isArray(x)) {
        let args = []
        x.forEach(async (el) => {
            args.push(f(el));
        })
        let resolvedArgs = await Promise.all(args);
        return await repeatAsyncFunc (n - 1) (f, resolvedArgs);
    }
    
    return await repeatAsyncFunc (n - 1) (f, await f(x));
}
