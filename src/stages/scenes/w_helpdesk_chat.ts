import { Telegraf, Context, Scenes, Markup, session } from 'telegraf'
import { socket } from '../../lib/socket_client_bridge'
import { check_ctx_type, kbd_inline,TG_TYPES,CTX_RES, clear_ctx, check_email, get_download_path, set_state, set_state_property } from '../../lib/tg'
import { Middleware } from '../../middleware/default'
import { FWizard, DATATYPE, check_ctx_for } from './factory'

// const {enter, leave} = Scenes.Stage
// Name = name of the Scene or Wizard
export const Name = 'helpdesk-wizard'

export const Visible = true
// Trigger = text or intent which trigers the Wizard
export const Triggers = ['helpdesk']

let selected:any = []

// Scene = initialise the Scene object 
//export const Scene = new Scenes.BaseScene<Scenes.SceneContext>(`${Name}`)

export const Wizard = new FWizard(Name,
    (ctx:any)=>{
        ctx.reply('welcome')
        check_ctx_for(ctx,DATATYPE.TEXT,'Please type your question (or type \'bye\' to exit)')
        .then((res:any)=>{
            if ((res.value as string)?.toLowerCase().trim() == 'bye') {

                socket.emit('tg-signal',{ctx})
                ctx.reply('Thank you, off you go...').then((_:any)=>{
                    ctx.scene.leave()
                })
                
            }
        })
    }
)