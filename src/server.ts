import { ReverseString, User } from "./lib"
import { Telegraf } from 'telegraf'
import dotenv from 'dotenv'
dotenv.config()

console.log('hello world', process.env.BOT_TOKEN)

let bot = new Telegraf(process.env.BOT_TOKEN as string)


bot.start((ctx)=>{
    console.log('started')
})

bot.on('text',(ctx)=>{
    console.log('I received a text message')
    console.log(ctx.update.message)
    let msg = ctx.update.message.text
    ctx.reply(`You said ${msg}`)
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