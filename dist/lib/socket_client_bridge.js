"use strict";
/*
Connects to a socket server

Receives signals (to send messages)
Sends signals (to send events)
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.SSocket = void 0;
const singleton_factory_1 = require("./singleton_factory");
class SSocket extends singleton_factory_1.SingletonFactory {
    constructor(loc = undefined) {
        super();
        if (SSocket._io == undefined || SSocket._io == null) {
            SSocket._io = require('socket.io-client').io(loc);
            console.log('- SSocket initialised');
            SSocket._io.on('connect', () => {
                console.log('connected', Object.keys(SSocket._io.ids));
            });
        }
        else {
            //console.log('- SSocket previously initialised')
        }
    }
    static init() {
        //SSocket.socket = SSocket._io.io()
    }
    socketConnect() {
        const isConnected = () => { return (SSocket._io != undefined && SSocket._io != null); };
        return new Promise((resolve, reject) => {
            if (!isConnected()) {
                console.log('not connected', SSocket._io);
                try {
                    while (true) {
                        if (isConnected()) {
                            console.log('--------------- connected');
                            resolve(SSocket._io);
                        }
                    }
                }
                catch (e) {
                    reject(e);
                }
            }
            else {
                resolve(SSocket.socket);
            }
        });
    }
    getSocket() {
        return SSocket.socket;
    }
}
exports.SSocket = SSocket;
SSocket.socket = undefined;
