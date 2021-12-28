"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.ReverseString = void 0;
const ReverseString = (val) => {
    return val.split('').reverse().join('');
};
exports.ReverseString = ReverseString;
class User {
    constructor(_uObj) {
        this.userObj = _uObj;
    }
    show() {
        console.log('user is', this.userObj);
    }
}
exports.User = User;
