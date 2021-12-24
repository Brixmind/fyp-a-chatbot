/*
Connects to a socket server

Receives signals (to send messages)
Sends signals (to send events)
*/
import {io, Socket as SocketClient} from 'socket.io-client'
import {BehaviorSubject} from 'rxjs'

let socket:any

export const SocketConnect = (loc:any=undefined)=>{
    return new Promise((resolve,reject)=>{
        let _socket = io(loc)
        _socket.on('connect',()=>{
            socket = _socket
            
            console.log('socket connected',_socket.id)
            resolve(_socket)
        })
    })
}

export const GetSocket = ()=>{
    return socket
}

// export module MSocket {
//     export let socket:any 
//     export let socketConnected:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
    
//     export const connect = (loc:string)=>{
//         if (socket == undefined || socket==null) socket = io(loc)
//         socket.on('connect', ()=>{
//             // socket.use((x:any,next:any)=>{
//             //     console.log(x)
//             //     return next()
//             // })
//             socketConnected.next(true)
//             console.log('socket connected', socket.id)
//         })
//     }
// }
export class SSocket {
    private static instance: SSocket;
    //Assign "new Singleton()" here to avoid lazy initialisation
    private static socket:any = undefined
    member:number|undefined = undefined;

    constructor(loc:string|any=undefined) {
        if (SSocket.instance) {
            return SSocket.instance;
        }
        SSocket.socket = io(loc)
        SSocket.socket.on('connect',()=>{
            console.log(SSocket.socket.id,'----connected')
            SSocket.socket.emit('tg-signal',{data:'connected'})
        })
        this.member = 0;
        SSocket.instance = this;
    }

    whenConnected() {
        const isConnected =  () => { return(SSocket.socket != undefined && SSocket.socket != null)}
        return new Promise((resolve,reject)=>{
            if (!isConnected()) {
                try{
                    while (true) {
                        if (isConnected()) {
                            resolve(SSocket.socket)
                        }
                    }
                } catch(e:any) {
                    reject(e)
                }
                
            } else {
                resolve(SSocket.socket)
            }
        })
    }

    getSocket() {
        return SSocket.socket
    }
    
}
// export class CSocket {

//     private static _instance:CSocket|undefined = undefined
//     public socket:any
//     public static isConnected:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
//     constructor(loc:any=undefined) {
//         let _socket = io(loc)
//         _socket.on('connect',()=>{
//             this.socket = _socket
//             CSocket.isConnected.next(true)
//             console.log('socket connected', this.socket.id)
//         })
//     }

//     public static init(loc:any=undefined) {
//         console.log('init',this._instance?.socket?.id)
//         const isConnected =  () => { return(this._instance?.socket != undefined && this._instance?.socket != null)}
//         return new Promise((resolve,reject)=>{
//             if (this._instance==undefined) {
//                 console.log('-------initializing socket')
//                 //const sIsConnected = 
//                 if (!isConnected()) {
//                     this._instance = new this(loc)
//                     console.log('init',this._instance?.socket?.id)
//                     while (true) {
//                         if (isConnected()) {
//                             resolve(this._instance.socket)
//                         }
//                     }
                    
//                 }
                
//             } else {
//                 resolve(this._instance.socket)
//             }
//         })
//     }

//     public broadcast(...args:any) {
//         CSocket._instance?.socket?.broadcast.emit(...args)
//     }
// }

