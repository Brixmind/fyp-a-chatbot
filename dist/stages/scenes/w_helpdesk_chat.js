"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wizard = exports.Triggers = exports.Visible = exports.Name = void 0;
const tg_1 = require("../../lib/tg");
const factory_1 = require("./factory");
// const {enter, leave} = Scenes.Stage
// Name = name of the Scene or Wizard
exports.Name = 'helpdesk-wizard';
exports.Visible = true;
// Trigger = text or intent which trigers the Wizard
exports.Triggers = ['helpdesk'];
let selected = [];
// Scene = initialise the Scene object 
//export const Scene = new Scenes.BaseScene<Scenes.SceneContext>(`${Name}`)
let socket = undefined;
exports.Wizard = new factory_1.FWizard(exports.Name, (ctx) => {
    let msg = `Welcome`;
    if (factory_1.FWizard.socket)
        msg = msg + `socket is connected! ${factory_1.FWizard.socket.id}`;
    ctx.reply(msg).then((_) => {
        (0, tg_1.clear_ctx)(ctx);
        factory_1.FWizard.next(ctx);
    });
}, (ctx) => {
    (0, factory_1.check_ctx_for)(ctx, factory_1.DATATYPE.TEXT, 'Please type your question (or type \'/bye\' to exit)')
        .then((res) => {
        console.log('res', res);
        if (res.type == factory_1.DATATYPE.TEXT) {
            if (res.value.toLowerCase().trim() == 'bye') {
                ctx.reply('Thank you, off you go...').then((_) => {
                    return factory_1.FWizard.leaveWizard(ctx);
                });
            }
            else {
                ctx.reply('>');
                factory_1.FWizard.socket.emit('tg-signal', { data: res.value });
                return;
            }
        }
    });
});
