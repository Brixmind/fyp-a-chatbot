import { Telegraf, Context, Scenes, Markup, session } from 'telegraf'
import { check_ctx_type, kbd_inline,TG_TYPES,CTX_RES, clear_ctx, check_email, get_download_path, set_state, set_state_property } from '../../lib/tg'
import { Middleware } from '../../middleware/default'
import { FWizard, DATATYPE, check_ctx_for } from './factory'

// const {enter, leave} = Scenes.Stage
// Name = name of the Scene or Wizard
export const Name = 'test-wizard'

export const Visible = true
// Trigger = text or intent which trigers the Wizard
export const Triggers = ['test']

// Scene = initialise the Scene object 
//export const Scene = new Scenes.BaseScene<Scenes.SceneContext>(`${Name}`)

export const Wizard = new FWizard(Name,
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
    (ctx:any)=>{
        check_ctx_for(ctx, DATATYPE.EMAIL,'Please enter your email below.').then((res:any)=>{
            console.log(res)
            if (res.type==DATATYPE.EMAIL) {
                ctx.reply(`thank you for your input`).then((_:any)=>{
                    let data = {email:res.value}
                    set_state_property(ctx,'email',res.value).then((_:any)=>{
                        ctx.wizard.next()
                        return ctx.wizard.steps[ctx.wizard.cursor](ctx);
                    })
                    
                })
            }
            
        })
    },
    (ctx:any)=>{
        check_ctx_for(ctx, DATATYPE.LOCATION, 'Please share your location.').then((res:any)=>{
            console.log(res)
            if (res.type==DATATYPE.LOCATION) {
                ctx.reply(`now I know where you are`).then((_:any)=>{
                    set_state_property(ctx,'location',res.value).then((_:any)=>{
                        ctx.wizard.next()
                        return ctx.wizard.steps[ctx.wizard.cursor](ctx);
                    })
                })
            }
        })
    },
    (ctx:any)=>{
        ctx.reply('Bye').then((d:any)=>{
            return ctx.scene.leave()
        })
        
    }
)
