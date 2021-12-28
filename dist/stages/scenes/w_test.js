"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wizard = exports.Triggers = exports.Visible = exports.Name = void 0;
const tg_1 = require("../../lib/tg");
const factory_1 = require("./factory");
// const {enter, leave} = Scenes.Stage
// Name = name of the Scene or Wizard
exports.Name = 'test-wizard';
exports.Visible = true;
// Trigger = text or intent which trigers the Wizard
exports.Triggers = ['test'];
let selected = [];
// Scene = initialise the Scene object 
//export const Scene = new Scenes.BaseScene<Scenes.SceneContext>(`${Name}`)
exports.Wizard = new factory_1.FWizard(exports.Name, 
// (ctx:any)=>{
//     console.log('---------------------')
//     check_ctx_for(ctx,DATATYPE.NUMBER,'Please type a number').then((res:any)=>{
//         console.log('res',res)
//         if (res?.type==DATATYPE.NUMBER) {
//             ctx.reply('thank you.').then((_ctx:any)=>{
//                 clear_ctx(ctx)
//                 ctx.wizard.selectStep(1)
//                 return ctx.wizard.steps[ctx.wizard.cursor](ctx)
//             })
//         }
//         //return ctx.wizard.steps[ctx.wizard.cursor](ctx)
//     })
//     //return 
// },
// (ctx:any)=>{
//     console.log('ready1')
//     check_ctx_for(ctx, DATATYPE.EMAIL, 'Please add your e-mail address').then((res:any)=>{
//         console.log('res',res)
//         if (res?.type==DATATYPE.EMAIL) {
//             ctx.reply('thank you.').then((_ctx:any)=>{
//                 clear_ctx(ctx)
//                 ctx.wizard.selectStep(2)
//                 return ctx.wizard.steps[ctx.wizard.cursor](ctx)
//             })
//         }
//         //return ctx.wizard.steps[ctx.wizard.cursor](ctx)
//     })},
// (ctx:any)=>{
//     console.log('ready2')
//     check_ctx_for(ctx, DATATYPE.PHOTO, 'Please add your photo').then((res:any)=>{
//         console.log('res',res)
//         if (res?.type==DATATYPE.PHOTO) {
//             ctx.reply('thank you.').then((_:any)=>{
//                 get_download_path(res.value?.file_id).then((result:any)=>{
//                     console.log(result?.file_path)
//                     if (result?.file_path != undefined) {
//                         ctx.reply(`https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${result.file_path}`)
//                     }
//                 })
//                 clear_ctx(ctx)
//                 //ctx.wizard.selectStep(2)
//                 //return ctx.wizard.steps[ctx.wizard.cursor](ctx)
//             })
//         }
//         //return ctx.wizard.steps[ctx.wizard.cursor](ctx)
//     })
// },
// (ctx:any)=>{
//     console.log('ready2')
//     check_ctx_for(ctx, DATATYPE.LOCATION, 'Please add a location').then((res:any)=>{
//         console.log('res',res)
//         if (res?.type==DATATYPE.LOCATION) {
//             ctx.reply('thank you.').then((ctx:any)=>{
//                 clear_ctx(ctx)
//                 ctx.wizard.selectStep(2)
//                 return ctx.wizard.steps[ctx.wizard.cursor](ctx)
//             })
//         }
//         //return ctx.wizard.steps[ctx.wizard.cursor](ctx)
//     })
// },
// (ctx:any)=>{
//     check_ctx_for(ctx, DATATYPE.CONFIRMCANCEL, 'Please pick one')
//         .then((res:any)=>{
//             console.log('value',res.value)
//             if (res.value==true) {
//                 ctx.reply('good').then((r:any)=>{
//                     return ctx.scene.leave()
//                 })
//             } else if (res.value==false) {
//                 ctx.reply('bye').then((r:any)=>{
//                     return ctx.scene.leave()
//                 })
//             }
//         })
// },
(ctx) => {
    console.log("Array:", selected);
    let options = [
        { text: `1`, cbvalue: "1" },
        { text: `2`, cbvalue: "2" },
        { text: `3`, cbvalue: "3" },
        { text: "done", cbvalue: "done" }
    ];
    (0, factory_1.check_ctx_for)(ctx, factory_1.DATATYPE.CB_QUERY_MULTI, 'Please select multiple options.', options, selected).then((res) => {
        console.log("res:", res);
        if (res.type == factory_1.DATATYPE.CB_QUERY_MULTI && res.value == "done") {
            ctx.reply(`thank you for your input`).then((_) => {
                (0, tg_1.set_state_property)(ctx, 'done', res.value).then((_) => {
                    selected = [];
                    ctx.wizard.next();
                    return ctx.wizard.steps[ctx.wizard.cursor](ctx);
                });
            });
        }
        else if (res.type == factory_1.DATATYPE.CB_QUERY_MULTI && res.value != "done") {
            if (selected.includes(res.value)) {
                selected = selected.filter((e) => e !== res.value);
            }
            else {
                console.log(res.value);
                selected.push(res.value);
            }
            ctx.wizard.selectStep(0);
            return ctx.wizard.steps[ctx.wizard.cursor](ctx);
        }
    });
}, (ctx) => {
    (0, factory_1.check_ctx_for)(ctx, factory_1.DATATYPE.LOCATION, 'Please share your location.').then((res) => {
        console.log(res);
        if (res.type == factory_1.DATATYPE.LOCATION) {
            ctx.reply(`now I know where you are`).then((_) => {
                (0, tg_1.set_state_property)(ctx, 'location', res.value).then((_) => {
                    ctx.wizard.next();
                    return ctx.wizard.steps[ctx.wizard.cursor](ctx);
                });
            });
        }
    });
}, (ctx) => {
    ctx.reply('Bye').then((d) => {
        return ctx.scene.leave();
    });
});
