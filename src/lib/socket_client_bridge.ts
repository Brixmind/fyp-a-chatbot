/*
Connects to a socket server

Receives signals (to send messages)
Sends signals (to send events)
*/
import {io, Socket as SocketClient} from 'socket.io-client'

export let socket:any

export const SocketConnect = (loc:any=undefined)=>{
    return new Promise((resolve,reject)=>{
        let _socket = io(loc)
        _socket.on('connect',()=>{
            socket = _socket
            resolve(_socket)
        })
    })
}

