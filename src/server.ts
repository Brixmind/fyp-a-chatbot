import { ReverseString, User } from "./lib"
import { Telegraf } from 'telegraf'
import dotenv from 'dotenv'
import { addUser, addUserMessage, DBConnect } from "./db/mongoose"
dotenv.config()

console.log('hello world', process.env.BOT_TOKEN)

DBConnect().then((connection:any)=>{
    let bot = new Telegraf(process.env.BOT_TOKEN as string)

    bot.use((ctx,next)=>{
        let user = (ctx.update as any).message.from
        console.log(user)
        addUser(user).then((d)=>{

        }).finally(()=>{
            next()
        })
        //await next()
    })

    bot.start((ctx)=>{
        console.log('started')
    })
    
    bot.on('text',(ctx)=>{
        let user = (ctx.update as any).message.from
        console.log('I received a text message')
        console.log(ctx.update.message)
        let msg = ctx.update.message.text
        addUserMessage(user.id,ctx.update.message).then((d:any)=>{
            ctx.reply(`You said ${msg}`)
        }).catch(e=>{
            ctx.reply(`Ooops something went wrong...`)
        })
        
    })
    
    bot.on('location',(ctx)=>{
        console.log(ctx.update.message)
        ctx.reply(`I know where you live, haha`)
    })
    
    bot.on('photo',(ctx)=>{
        console.log(ctx.update.message)
    })
    
    bot.on('document',(ctx)=>{
        console.log(ctx.update.message)
    })
    
    bot.on('contact',(ctx)=>{
        console.log(ctx.update.message)
    })
    
    bot.on('audio',(ctx)=>{
        console.log(ctx.update.message)
    })
    
    bot.on('video',(ctx)=>{
        console.log(ctx.update.message)
    })
    
    bot.launch()
})

