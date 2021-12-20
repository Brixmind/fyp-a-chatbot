import moment from 'moment'
import { Telegraf, Context, Scenes, Markup, session, Middleware, Telegram } from 'telegraf'
export const DATATYPE = {
    'CB_QUERY':'cb_query',
    'TEXT': 'text',
    'NUMBER': 'number',
    'DATE': 'date',
    'EMAIL': 'email',
    'PHOTO': 'photo',
    'VIDEO': 'video',
    'AUDIO': 'audio',
    'DOCUMENT': 'document',
    'CONFIRMCANCEL':'confirmcancel',
    'LOCATION':'location'
}
interface ResultPayload {
    type:string|null,
    value:any|null
}
export class FWizard extends Scenes.WizardScene<any> {

    constructor(name:string,...steps: Array<any>) {
        super(name,...steps)
        this.use(Events)
    }

    next(ctx:any,step:number) {

    }

    leaveWizard(ctx:any) {
       ctx.scene.leave()
    }

    


}

const Events = (ctx:any,next:any)=>{
    console.log('middleware ----------======|')
    console.log(Object.keys(ctx.update))
    return next()
    // bot.on('text',(ctx:any)=>{
    //     console.log('------------>')
    //     next()
    // })
}

export const check_ctx_for =(ctx:any,datatype:string, message:string|any=null)=>{
    
    return new Promise((resolve,reject)=>{
        let result:ResultPayload = {type:null, value:null}
        let value = null
        new Promise((resolve,reject)=>{
            switch (datatype) {
                case DATATYPE.DATE:
                    if (ctx.update?.message?.text!=undefined && ctx.update?.message?.text!=null) {
                        //message=null
                        value = ctx.update.message.text
                        if ((!isNaN(value.trim())) && !isNaN(parseFloat(value.trim()))) {
                            result.type = DATATYPE.NUMBER
                            result.value = value
                            delete ctx.update.message.text
                            resolve(result)
                        } else {
                            resolve(null)
                        }
                    }
                    break
                case DATATYPE.EMAIL:
                    console.log(':::email')
                    if (ctx.update?.message?.text!=undefined && ctx.update?.message?.text!=null) {
                        //message = null
                        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                        if (re.test(ctx.update.message.text)) {
                            result.type = DATATYPE.EMAIL
                            result.value = ctx.update.message.text
                            delete ctx.update.message.text
                            resolve(result)
                        } else {
                            resolve(null)
                        }
                    }
                    break
                case DATATYPE.NUMBER:
                    if (ctx.update?.message?.text!=undefined && ctx.update?.message?.text!=null) {
                        //message = null
                        value = ctx.update.message.text
                        if ((!isNaN(value.trim())) && !isNaN(parseFloat(value.trim()))) {
                            result.type = DATATYPE.NUMBER
                            result.value = value
                            delete ctx.update.message.text
                            resolve(result)
                        } else {
                            resolve(null)
                        }
                    } 
                    
                    //console.log(ctx.update)
                    break
                case DATATYPE.PHOTO:
                    console.log(ctx)
                    if (ctx.update?.message?.text!=undefined && ctx.update?.message?.text!=null) {
                        //message = null
                        value = ctx.update.message.text
                        if ((!isNaN(value.trim())) && !isNaN(parseFloat(value.trim()))) {
                            result.type = DATATYPE.NUMBER
                            result.value = value
                            delete ctx.update.message.text
                            resolve(result)
                        } else {
                            resolve(null)
                        }
                    } 
                    
                    //console.log(ctx.update)
                    break

            }
            resolve(null)
        }).then((res:any)=>{
            if (res==null) {
                //console.log(ctx)
                if (message != null) {
                    console.log('message')
                    ctx.reply(message).then((dd:any)=>{
                        console.log('beep')
                        resolve(false)
                    })
                } else {
                    resolve(false)
                }
            } else {
                resolve(res)
            }
        })
        
        
        
    })
}
export const wait_for = (ctx:any, datatype:string,prompt:string,options:any)=>{
    return new Promise((resolve,reject)=>{
        check_ctx_for(ctx,datatype).then((res:any)=>{
            resolve(null)
        })
        switch (datatype) {
            case DATATYPE.CB_QUERY:
                break
            case DATATYPE.TEXT:
                break
            case DATATYPE.NUMBER:
                break
            case DATATYPE.DATE:
                break
            case DATATYPE.EMAIL:
                break
            case DATATYPE.PHOTO:
                break
            case DATATYPE.VIDEO:
                break
            case DATATYPE.AUDIO:
                break
            case DATATYPE.DOCUMENT:
                break
            case DATATYPE.CONFIRMCANCEL:
                break
            case DATATYPE.LOCATION:
                break
            default:
                resolve(null)
        }
    })
}