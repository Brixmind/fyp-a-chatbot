"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingletonFactory = void 0;
class SingletonFactory {
    constructor() {
        if (SingletonFactory.instance) {
            return SingletonFactory.instance;
        }
        SingletonFactory.instance = this;
    }
    instance() {
        return SingletonFactory.instance;
    }
}
exports.SingletonFactory = SingletonFactory;
