"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitEvents = exports.Middleware = void 0;
const mongoose_1 = require("../db/mongoose");
const Middleware = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    console.time('aaa');
    if (((_b = (_a = ctx.session) === null || _a === void 0 ? void 0 : _a.__scenes) === null || _b === void 0 ? void 0 : _b.current) != undefined) {
        console.log('you are in a scene', (_c = ctx.session.__scenes) === null || _c === void 0 ? void 0 : _c.current);
    }
    // const xreply = ctx.reply
    // ctx.reply = (args:any[])=>{
    //     if (ctx.session) ctx.session.lastMessage = args[0]
    //     console.log('lm',args[0])
    //     try{
    //         xreply(args)
    //     } catch(e) {
    //         console.log(e)
    //     }
    // }
    yield next();
    console.timeEnd('aaa');
});
exports.Middleware = Middleware;
const InitEvents = (bot) => {
    bot.start((ctx) => {
        console.log('started');
        const message = `Good day to you. Welcome to RaDial (Rajang Dialog) Engine.`;
        ctx.reply(message);
    });
    bot.on('text', (ctx) => {
        let user = ctx.update.message.from;
        let msg = ctx.update.message.text;
        (0, mongoose_1.addUserMessage)(user.id, ctx.update.message).then((d) => {
            ctx.reply(`You said ${msg}`);
        }).catch(e => {
            ctx.reply(`Ooops something went wrong...`);
        });
    });
    bot.on('location', (ctx) => {
        console.log(ctx.update.message);
        ctx.reply(`I know where you live, haha`);
    });
    bot.on('photo', (ctx) => {
        console.log(ctx.update.message);
    });
    bot.on('document', (ctx) => {
        console.log(ctx.update.message);
    });
    bot.on('contact', (ctx) => {
        console.log(ctx.update.message);
    });
    bot.on('audio', (ctx) => {
        console.log(ctx.update.message);
    });
    bot.on('video', (ctx) => {
        console.log(ctx.update.message);
    });
};
exports.InitEvents = InitEvents;
