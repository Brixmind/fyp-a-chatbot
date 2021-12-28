"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
let port = 5000;
if (process.env.SOCKET_BRIDGE_PORT != undefined) {
    port = parseInt(process.env.SOCKET_BRIDGE_PORT);
}
app.use(express_1.default.static(path_1.default.join(__dirname, 'test_static')));
let http = require('http').Server(app);
let io = require('socket.io')(http);
io.on('connection', (socket) => {
    console.log(`user connected ${socket.id} connected`);
    socket.on('test-signal', (payload) => {
        console.log(`received`, payload);
        socket.emit('server-message', { received: payload, dt: new Date() });
    });
    socket.on('tg-signal', (payload) => {
        socket.broadcast.emit('server-broadcast', { type: 'tg-signal', payload: payload, dt: new Date() });
    });
    socket.on('disconnect', (reason) => {
        if (reason == 'transport close') {
            console.log(console.log(`user ${socket.id} disconnected`));
        }
        else {
            console.log(`user ${socket.id} disconnected`, reason);
        }
    });
    setInterval(() => {
        socket.broadcast.emit('server-broadcast', { type: 'ping', dt: new Date() });
    }, 5000);
});
const server = http.listen(port, () => {
    console.log(`listening to ${port}`);
});
