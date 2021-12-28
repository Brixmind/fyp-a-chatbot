"use strict";
const waitforme = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, 1000);
    });
};
let a = 10;
waitforme().then((rval) => {
    console.log('done', rval);
    a = 2;
});
console.log(`a is ${a}`);
