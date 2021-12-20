import { Telegraf, Context, Scenes, Markup, session } from 'telegraf'
import { check_ctx_type, kbd_inline,TG_TYPES,CTX_RES, clear_ctx, check_email } from '../../lib/tg'
import { Middleware } from '../../middleware/default'
import { FWizard, DATATYPE, check_ctx_for, wait_for } from './factory'

// const {enter, leave} = Scenes.Stage
// Name = name of the Scene or Wizard
export const Name = 'register-ic'

export const Visible = true
// Trigger = text or intent which trigers the Wizard
export const Triggers = ['registeric']

// Scene = initialise the Scene object 
//export const Scene = new Scenes.BaseScene<Scenes.SceneContext>(`${Name}`)

export const Wizard = new FWizard(Name,
    (ctx:any)=>{
        console.log('---------------------')
        check_ctx_for(ctx,DATATYPE.NUMBER,'Please type a number').then((res:any)=>{
            console.log('res',res)
            if (res?.type==DATATYPE.NUMBER) {
                ctx.reply('thank you.').then((_ctx:any)=>{
                    clear_ctx(ctx)
                    ctx.wizard.selectStep(1)
                    return ctx.wizard.steps[ctx.wizard.cursor](ctx)
                })
                
            }
            //return ctx.wizard.steps[ctx.wizard.cursor](ctx)
        })
        //return 
    },
    (ctx:any)=>{
        console.log('ready1')
        check_ctx_for(ctx, DATATYPE.EMAIL, 'Please add your e-mail address').then((res:any)=>{
            console.log('res',res)
            if (res?.type==DATATYPE.EMAIL) {
                ctx.reply('thank you.').then((_ctx:any)=>{
                    clear_ctx(ctx)
                    ctx.wizard.selectStep(2)
                    return ctx.wizard.steps[ctx.wizard.cursor](ctx)
                })
                
            }
            //return ctx.wizard.steps[ctx.wizard.cursor](ctx)
        })},
    (ctx:any)=>{
        console.log('ready2')
        check_ctx_for(ctx, DATATYPE.PHOTO, 'Please add your photo').then((res:any)=>{
            console.log('res',res)
            if (res?.type==DATATYPE.PHOTO) {
                ctx.reply('thank you.').then((ctx:any)=>{
                    clear_ctx(ctx)
                    ctx.wizard.selectStep(2)
                    return ctx.wizard.steps[ctx.wizard.cursor](ctx)
                })
                
            }
            //return ctx.wizard.steps[ctx.wizard.cursor](ctx)
        })
    }
)
