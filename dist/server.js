"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = require("./db/mongoose");
const stages_1 = require("./stages");
const default_1 = require("./middleware/default");
const socket_client_bridge_1 = require("./lib/socket_client_bridge");
console.log('hello world', process.env.BOT_TOKEN);
let _ = new socket_client_bridge_1.SSocket('ws://localhost:5005');
_.socketConnect().then((socket) => {
    (0, mongoose_1.DBConnect)().then((connection) => {
        let bot = new telegraf_1.Telegraf(process.env.BOT_TOKEN);
        bot.use((0, telegraf_1.session)()); // session is deprecated but it seems needed to set up stages...
        (0, stages_1.PluginInit)(bot).then((stage) => {
            //console.log('>>>>middleware',stage)
            // /bot.use(Middleware)
            bot.use(stage.middleware());
            (0, stages_1.ProcessTriggers)(bot, socket);
            (0, default_1.InitEvents)(bot);
            bot.launch();
        });
        process.once('SIGINT', () => bot.stop('SIGINT'));
        process.once('SIGTERM', () => bot.stop('SIGTERM'));
    });
});
