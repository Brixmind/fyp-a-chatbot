import moment from 'moment'
import { Telegraf, Context, Scenes, Markup, session, Middleware, Telegram } from 'telegraf'
import { kbd_inline } from '../../lib/tg'
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

export const check_ctx_for =(ctx:any,datatype:string, message:string|any=null,options:any=null)=>{
    
    return new Promise((resolve,reject)=>{
        let result:ResultPayload = {type:null, value:null}
        let value = null
        new Promise((resolve,reject)=>{
            switch (datatype) {
                case DATATYPE.DATE:
                    //https://github.com/wanasit/chrono
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
                    console.log('photo?',ctx.update?.message?.photo)
                    if (ctx.update?.message?.photo!=undefined && ctx.update?.message?.photo!=null) {
                        //message = null
                        let allmedia = ctx.update?.message?.photo
                        value = allmedia[allmedia.length-1]
                        console.log('value',value)
                        if (value?.file_id != undefined) {
                            result.type = DATATYPE.PHOTO
                            result.value = value
                            delete ctx.update.message.photo
                            resolve(result)
                        } else {
                            resolve(null)
                        }
                    } 
                    
                    //console.log(ctx.update)
                    break
                case DATATYPE.AUDIO:
                    console.log('audio?',ctx.update?.message?.voice)
                    if (ctx.update?.message?.voice!=undefined && ctx.update?.message?.voice!=null) {
                        //message = null
                        //let allmedia = ctx.update?.message?.photo
                        value = ctx.update?.message?.voice
                        console.log('value',value)
                        if (value?.file_id != undefined) {
                            result.type = DATATYPE.AUDIO
                            result.value = value
                            delete ctx.update.message.voice
                            resolve(result)
                        } else {
                            resolve(null)
                        }
                    } 
                    
                    //console.log(ctx.update)
                    break
                case DATATYPE.VIDEO:
                    console.log('video?',ctx.update?.message?.video)
                    if (ctx.update?.message?.video!=undefined && ctx.update?.message?.video!=null) {
                        //message = null
                        //let allmedia = ctx.update?.message?.photo
                        value = ctx.update?.message?.video
                        console.log('value',value)
                        if (value?.file_id != undefined) {
                            result.type = DATATYPE.VIDEO
                            result.value = value
                            delete ctx.update.message.video
                            resolve(result)
                        } else {
                            resolve(null)
                        }
                    } 
                    
                    //console.log(ctx.update)
                    break
                case DATATYPE.DOCUMENT:
                    console.log('document?',ctx.update?.message?.document)
                    if (ctx.update?.message?.document!=undefined && ctx.update?.message?.document!=null) {
                        //message = null
                        //let allmedia = ctx.update?.message?.photo
                        value = ctx.update?.message?.document
                        console.log('value',value)
                        if (value?.file_id != undefined) {
                            result.type = DATATYPE.DOCUMENT
                            result.value = value
                            delete ctx.update.message.document
                            resolve(result)
                        } else {
                            resolve(null)
                        }
                    } 
                    
                    //console.log(ctx.update)
                    break
                case DATATYPE.LOCATION:
                    console.log('location?',ctx.update?.message?.location)
                    if (ctx.update?.message?.location!=undefined && ctx.update?.message?.location!=null) {
                        //message = null
                        //let allmedia = ctx.update?.message?.photo
                        value = ctx.update?.message?.location
                        console.log('value',value)
                        if (value?.latitude != undefined) {
                            result.type = DATATYPE.LOCATION
                            result.value = value
                            delete ctx.update.message.location
                            resolve(result)
                        } else {
                            resolve(null)
                        }
                    } 
                    
                    //console.log(ctx.update)
                    break
                case DATATYPE.CB_QUERY:
                    console.log('confirmcancel',ctx.update?.callback_query?.data)
                    if (ctx.update?.callback_query?.data != undefined && ctx.update?.callback_query?.data != null) {
                        value = ctx.update.callback_query.data
                        result.type = DATATYPE.CB_QUERY
                        result.value = ctx.update.callback_query.data
                        delete ctx.update.callback_query.data 
                        resolve(result)
                    } else {
                        resolve(null)
                    }
                    break
                case DATATYPE.CONFIRMCANCEL:
                    options = [{text:'Confirm IT now',cbvalue:'confirm'},{text:'Cancel it lah', cbvalue:'cancel'}]
                    console.log('confirmcancel',ctx.update?.callback_query?.data)
                    if (ctx.update?.callback_query?.data != undefined && ctx.update?.callback_query?.data != null) {
                        value = ctx.update.callback_query.data
                        result.type = DATATYPE.CONFIRMCANCEL
                        result.value = ctx.update.callback_query.data
                        delete ctx.update.callback_query.data 
                        resolve(result)
                    } else {
                        resolve(null)
                    }
                    break
            }
            resolve(null)
        }).then((res:any)=>{
            if (res==null) {
                //console.log(ctx)
                if (message != null) {
                    console.log('message')
                    if (options != null) {
                        kbd_inline(options).then((kbd:any)=>{
                            ctx.reply(message,kbd).then((dd:any)=>{
                                resolve(false)
                            })
                        })
                    } else {
                        ctx.reply(message).then((dd:any)=>{
                            console.log('beep')
                            resolve(false)
                        })
                    }
                    
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