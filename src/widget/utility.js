const toString = Object.prototype.toString;

function isAsyncFunction (func) {
    return toString.call(func) === '[object AsyncFunction]';
}

function enumArr2Hash (arr, label = 'label', value = 'value') {
    return arr.reduce((obj, item) => {
        obj[item[value]] = item[label];
        return obj;
    }, {});
}

function logError (e) {
    console && console.log && console.log(e);
}

function onceAsync (fn) {
    let promise;
    return function (cb, ...args) {
        if (promise === undefined) {
            promise = new Promise((resolve) => {
                fn(resolve, ...args);
            });
        }
        promise.then(cb);
    };
}

function deepFreeze (obj) {
    const propNames = Object.getOwnPropertyNames(obj);
    propNames.forEach(function (name) {
        const prop = obj[name];
        if (prop !== null && typeof prop === 'object') { deepFreeze(prop); }
    });
    return Object.freeze(obj);
}

const numberOfDaysMap = {
    1: 31,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
};

function numberOfDays (Y, M) {
    if (M !== 2) {
        return numberOfDaysMap[M];
    }
    // 闰年二月29天
    if ((Y % 4 === 0 && Y % 100 !== 0) || Y % 400 === 0) {
        return 29;
    }
    // 平年二月28天
    return 28;
}

export {
    isAsyncFunction,
    enumArr2Hash,
    logError,
    onceAsync,
    deepFreeze,
    numberOfDays,
};
