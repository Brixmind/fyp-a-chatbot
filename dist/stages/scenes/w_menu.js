"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wizard = exports.Triggers = exports.Visible = exports.Name = void 0;
const factory_1 = require("./factory");
// const {enter, leave} = Scenes.Stage
// Name = name of the Scene or Wizard
exports.Name = 'main-menu';
exports.Visible = true;
// Trigger = text or intent which trigers the Wizard
exports.Triggers = ['mainmenu'];
exports.Wizard = new factory_1.FWizard(exports.Name, (ctx) => {
    (0, factory_1.check_ctx_for)(ctx, factory_1.DATATYPE.CB_QUERY, 'Welcome to the Bot', [
        { text: 'Run Test', cbvalue: 'runtest' },
        { text: 'Register your CV', cbvalue: 'uploadcv' },
        { text: 'Helpdesk Wizard', cbvalue: 'helpdesk' },
        { text: 'Reset CV', cbvalue: 'clearcv' },
        { text: 'Register User', cbvalue: 'register' }
    ])
        .then((res) => {
        if (res != null && res != false) {
            switch (true) {
                case (res.value == 'runtest'):
                    return ctx.scene.enter('test-wizard');
                case (res.value == 'uploadcv'):
                    return ctx.scene.enter('upload-cv-wizard');
                case (res.value == 'clearcv'):
                    return ctx.scene.enter('clear-cv-wizard');
                case (res.value == 'helpdesk'):
                    return ctx.scene.enter('helpdesk-wizard');
                case (res.value == 'register'):
                    return ctx.scene.enter('register-user');
            }
        }
    });
}, (ctx) => {
    (0, factory_1.check_ctx_for)(ctx, factory_1.DATATYPE.CONFIRMCANCEL, 'Please pick one')
        .then((res) => {
        console.log(res.data);
    });
}, (ctx) => {
    ctx.reply('Bye').then((d) => {
        return ctx.scene.leave();
    });
});
