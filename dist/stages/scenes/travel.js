"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene = exports.Triggers = exports.Visible = exports.Name = void 0;
const telegraf_1 = require("telegraf");
const default_1 = require("../../middleware/default");
// const {enter, leave} = Scenes.Stage
// Name = name of the Scene or Wizard
exports.Name = 'travel-scene';
exports.Visible = true;
// Trigger = text or intent which trigers the Wizard
exports.Triggers = ['travel'];
// Scene = initialise the Scene object 
exports.Scene = new telegraf_1.Scenes.BaseScene(exports.Name);
// Set the scene up with a middleware (to catch events coming in and out).
// the only event a middleware doesn't catch is the "enter" scene event
exports.Scene.use(default_1.Middleware);
exports.Scene.enter((ctx) => {
    //Middleware(ctx,null)
    ctx.reply('hello welcome to travel');
});
exports.Scene.on('text', (ctx) => {
    var _a, _b;
    console.log('x');
    if (((_a = ctx.update) === null || _a === void 0 ? void 0 : _a.message.text) == 'bye') {
        ctx.scene.leave();
    }
    else if (((_b = ctx.update) === null || _b === void 0 ? void 0 : _b.message.text) == 'help') {
        ctx.reply('Type "bye" if you want to leave this scene');
    }
    else {
        ctx.reply('hmmm');
    }
});
exports.Scene.leave((ctx) => {
    ctx.reply('good-bye');
});
