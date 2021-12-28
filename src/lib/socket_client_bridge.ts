/*
Connects to a socket server

Receives signals (to send messages)
Sends signals (to send events)
*/

import {BehaviorSubject} from 'rxjs'
import { io } from 'socket.io-client'
import { SingletonFactory } from './singleton_factory'

export class SSocket extends SingletonFactory {

    private static socket:any = undefined
    //member:number|undefined = undefined
    private static _io:any
    constructor(loc:string|any = undefined) {
        super()
        if (SSocket._io == undefined || SSocket._io == null) {
            SSocket._io = require('socket.io-client').io(loc)
            console.log('- SSocket initialised')
            SSocket._io.on('connect',()=>{
                console.log('connected',Object.keys(SSocket._io.ids))
            })
        } else {
            //console.log('- SSocket previously initialised')
        }


    }

    static init() {
        //SSocket.socket = SSocket._io.io()

    }

    socketConnect() {
        const isConnected =  () => { return(SSocket._io != undefined && SSocket._io != null)}
        return new Promise((resolve,reject)=>{
            if (!isConnected()) {
                console.log('not connected',SSocket._io)
                try{
                    while (true) {
                        if (isConnected()) {
                            console.log('--------------- connected')
                            resolve(SSocket._io)
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




