"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wizard = exports.Triggers = exports.Visible = exports.Name = void 0;
const tg_1 = require("../../lib/tg");
const factory_1 = require("./factory");
// const {enter, leave} = Scenes.Stage
// Name = name of the Scene or Wizard
exports.Name = 'upload-cv-wizard';
exports.Visible = true;
// Trigger = text or intent which trigers the Wizard
exports.Triggers = ['uploadcv'];
// Scene = initialise the Scene object 
//export const Scene = new Scenes.BaseScene<Scenes.SceneContext>(`${Name}`)
exports.Wizard = new factory_1.FWizard(exports.Name, (ctx) => {
    ctx.reply('welcome to upload CV').then((_) => {
        ctx.wizard.next();
        return ctx.wizard.steps[ctx.wizard.cursor](ctx);
    });
}, (ctx) => {
    (0, tg_1.get_state_property)(ctx, 'selfie').then((_) => {
        if (_ == undefined) {
            (0, factory_1.check_ctx_for)(ctx, factory_1.DATATYPE.PHOTO, 'To register your cv, we need your latest photo. Please take a selfie photo')
                .then((res) => {
                if ((res === null || res === void 0 ? void 0 : res.type) == factory_1.DATATYPE.PHOTO) {
                    (0, tg_1.set_state_property)(ctx, 'selfie', res.value).then((_) => {
                        ctx.reply('thank you');
                    });
                }
            });
        }
        else {
            ctx.reply('you already have a selfie, skipping this...').then((_) => {
                ctx.wizard.next();
                return ctx.wizard.steps[ctx.wizard.cursor](ctx);
            });
        }
    });
}, (ctx) => {
    (0, tg_1.get_state_property)(ctx, 'cvdoc').then((_) => {
        if (_ == undefined) {
            (0, factory_1.check_ctx_for)(ctx, factory_1.DATATYPE.DOCUMENT, 'To register your cv, we need your latest CV Document. Please upload the document')
                .then((res) => {
                if ((res === null || res === void 0 ? void 0 : res.type) == factory_1.DATATYPE.DOCUMENT) {
                    (0, tg_1.set_state_property)(ctx, 'cvdoc', res.value).then((_) => {
                        ctx.reply('thank you');
                    });
                }
            });
        }
        else {
            ctx.reply('you already have a CV Document, skipping this...').then((_) => {
                ctx.wizard.next();
                return ctx.wizard.steps[ctx.wizard.cursor](ctx);
            });
        }
    });
}, (ctx) => {
    ctx.reply('DONE!').then((_) => {
        return ctx.scene.leave();
    });
});
