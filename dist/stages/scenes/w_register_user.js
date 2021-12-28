"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wizard = exports.Triggers = exports.Visible = exports.Name = void 0;
const tg_1 = require("../../lib/tg");
const factory_1 = require("./factory");
// const {enter, leave} = Scenes.Stage
// Name = name of the Scene or Wizard
exports.Name = 'register-user';
exports.Visible = true;
// Trigger = text or intent which trigers the Wizard
exports.Triggers = ['register'];
exports.Wizard = new factory_1.FWizard(exports.Name, (ctx) => {
    (0, tg_1.check_ctx_type)(ctx).then((res) => {
        (0, tg_1.init_state)(ctx).then((d) => {
            var _a;
            console.log('state', ctx.wizard.state);
            if (res == null) {
                (0, tg_1.kbd_inline)([
                    { text: 'Register E-mail', cbvalue: 'register' },
                    { text: 'Register IC', cbvalue: 'registeric' },
                    { text: 'Home', url: 'https://rajang.com?' },
                    { text: 'Go back', cbvalue: 'exit' }
                ]).then((kbd) => {
                    ctx.reply('Welcome to the wizard, please choose one of the following options', kbd);
                    //console.log(ctx)
                    return;
                });
            }
            else {
                console.log('received', (_a = ctx.update) === null || _a === void 0 ? void 0 : _a.update_id);
                if (res.type == tg_1.TG_TYPES.CB_QUERY) {
                    switch (res.data) {
                        case 'exit':
                            ctx.reply('Thank you. See you later.');
                            return ctx.scene.leave();
                        case 'register':
                            (0, tg_1.clear_ctx)(ctx);
                            console.log('registering');
                            ctx.wizard.selectStep(1);
                            return ctx.wizard.steps[ctx.wizard.cursor](ctx);
                        case 'registeric':
                            ctx.scene.enter('register-ic', { 'last_scene': exports.Name, 'last_step': ctx.wizard.cursor });
                            return;
                        default:
                            console.log('unknown answer', res.data, ctx.update.callback_query);
                            // ctx.wizard.selectStep(STEP_THANK_YOU)
                            return;
                        //return ctx.wizard.steps[ctx.wizard.cursor](ctx)
                        //return ctx.wizard.steps[0](ctx)
                    }
                }
            }
        }).catch((e) => {
            console.log(e);
        });
    });
}, (ctx) => {
    // register user
    // ask user for e-mail
    // verify e-mail
    (0, tg_1.check_ctx_type)(ctx).then((res) => {
        //console.log('res',res)
        if (res == null) {
            ctx.reply('Enter email');
            //return
        }
        else if (res.type == tg_1.TG_TYPES.CB_QUERY) {
            if (res.data == 'confirm') {
                ctx.wizard.state['data']['email'] = ctx.wizard.state['_'];
                ctx.wizard.state['_'] = null;
                ctx.reply('Thank you');
                (0, tg_1.set_state)(ctx).then((d) => {
                    ctx.wizard.selectStep(0);
                    return ctx.wizard.steps[ctx.wizard.cursor](ctx);
                }).catch((e) => {
                    console.log('error', e);
                    return;
                });
            }
            else if (res.data == 'retry') {
                ctx.reply('Please try again');
                return;
            }
            else {
                ctx.wizard.selectStep(0);
                return ctx.wizard.steps[ctx.wizard.cursor](ctx);
            }
        }
        else {
            if (res.type == tg_1.TG_TYPES.TEXT) {
                console.log('data', res.data);
                (0, tg_1.check_email)(res.data).then((email) => {
                    if (email == null) {
                        ctx.reply('This is not a valid e-mail address');
                    }
                    else {
                        ctx.wizard.state['_'] = res.data;
                        (0, tg_1.kbd_inline)([
                            { text: 'Confirm', cbvalue: 'confirm' },
                            { text: 'Retry', cbvalue: 'retry' },
                            { text: 'Cancel', cbvalue: 'cancel' }
                        ], []).then((kbd) => {
                            ctx.reply(`Confirm text entry [${res.data}]`, kbd);
                        });
                    }
                });
            }
            else {
                console.log('x');
            }
            return;
        }
    });
}, (ctx) => {
    ctx.reply('byeee');
    return ctx.scene.leave();
});
// Set the scene up with a middleware (to catch events coming in and out).
// the only event a middleware doesn't catch is the "enter" scene event
exports.Wizard.on('text', (ctx, next) => {
    console.log('text in a wizard captured');
    return next();
});
