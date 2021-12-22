import { Telegraf, Context, Scenes, Markup, session } from 'telegraf'
import LocalSession from 'telegraf-session-local'
import dotenv from 'dotenv'
dotenv.config()
import { addUser, addUserMessage, DBConnect } from "./db/mongoose"
import { ReverseString, User } from "./lib"
import { GetTriggers, PluginInit, ProcessTriggers } from './stages'
import { InitEvents, Middleware } from './middleware/default'
import {io, Socket, Socket as SocketClient} from 'socket.io-client'
import { SocketConnect } from './lib/socket_client_bridge'


console.log('hello world', process.env.BOT_TOKEN)

SocketConnect('ws://localhost:5005').then((socket:any)=>{
    DBConnect().then((connection:any)=>{
        let bot = new Telegraf(process.env.BOT_TOKEN as string)

        
        PluginInit(bot).then((stage:any)=>{
            //console.log('>>>>middleware',stage)
            bot.use(session()) // session is deprecated but it seems needed to set up stages...
            // /bot.use(Middleware)
            bot.use(stage.middleware())
            //console.log('socket',socket)
            ProcessTriggers(bot,socket)
            InitEvents(bot)
            bot.launch()
    
        })
        process.once('SIGINT', () => bot.stop('SIGINT'))
        process.once('SIGTERM', () => bot.stop('SIGTERM'))
        
    })
})
// socket.on('connect',()=>{

// })


