"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wizard = exports.Triggers = exports.Visible = exports.Name = void 0;
const tg_1 = require("../../lib/tg");
const factory_1 = require("./factory");
// const {enter, leave} = Scenes.Stage
// Name = name of the Scene or Wizard
exports.Name = 'clear-cv-wizard';
exports.Visible = true;
// Trigger = text or intent which trigers the Wizard
exports.Triggers = ['clearcv'];
// Scene = initialise the Scene object 
//export const Scene = new Scenes.BaseScene<Scenes.SceneContext>(`${Name}`)
exports.Wizard = new factory_1.FWizard(exports.Name, (ctx) => {
    (0, tg_1.clear_state)(ctx, 'upload-cv-wizard').then((_) => {
        //console.log('>',_)
        ctx.reply('scene cleared');
        return ctx.scene.leave();
    });
});
