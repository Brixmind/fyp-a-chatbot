"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessTriggers = exports.GetTriggers = exports.PluginInit = exports.AllWizards = exports.AllScenes = void 0;
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const telegraf_1 = require("telegraf");
const tg_1 = require("../lib/tg");
exports.AllScenes = [];
exports.AllWizards = {};
let default_wizard = null;
let env_default_wizard = process.env.DEFAULT_WIZARD;
//
let MainStage;
let AllTriggers = {};
let AllWizardTriggers = {};
const ONEHOUR = 60 * 60;
const ONEDAY = ONEHOUR * 24;
/*
Copyright 2021 - Rajang Digital Solutions
Scene and Wizard bootloader
*/
let myBot = null;
const PluginInit = (bot) => {
    myBot = bot;
    return new Promise((resolve, reject) => {
        fs.readdir(path_1.default.join(__dirname, '/scenes/'), (err, files) => {
            /*
            Scan the scenes folder for valid files
            */
            files === null || files === void 0 ? void 0 : files.forEach((file) => {
                if (file == 'index.ts')
                    return;
                //console.log(file)
                let o = require(path_1.default.join(__dirname, '/scenes/', file));
                const exposed_methods = Object.keys(o);
                if (exposed_methods.indexOf('Scene') >= 0 && exposed_methods.indexOf('Name') >= 0) {
                    const allkeys_AllScenes = Object.keys(exports.AllScenes);
                    //console.log('Found Scene',o['Name'])
                    if (exposed_methods.indexOf('Triggers') >= 0) {
                        AllTriggers[o['Name']] = o['Triggers'];
                    }
                    if (allkeys_AllScenes.indexOf(o['Name']) < 0) {
                        exports.AllScenes[o['Name']] = o['Scene'];
                        //console.log(path.join(__dirname,'/scenes/',file),AllScenes[o['Name']])
                    }
                }
                else if (exposed_methods.indexOf('Wizard') >= 0 && exposed_methods.indexOf('Name') >= 0) {
                    const allkeys_AllScenes = Object.keys(exports.AllScenes);
                    //console.log('Found Wizard',o['Name'])
                    if (allkeys_AllScenes.indexOf(o['Name']) < 0) {
                        exports.AllScenes[o['Name']] = o['Wizard'];
                        if (env_default_wizard == o['Name']) {
                            console.log('setting default_wizard:', o['Name']);
                            default_wizard = o['Name'];
                        }
                    }
                    if (exposed_methods.indexOf('Triggers') >= 0) {
                        AllTriggers[o['Name']] = o['Triggers'];
                    }
                }
                else {
                    console.log(`Ignored -- ${file}`);
                }
                //console.log('triggers',AllTriggers)
            });
            console.log('Number of Scenes registered:', Object.keys(exports.AllScenes).length);
            // all scenes have a maximum ttl of one hour
            resolve(new telegraf_1.Scenes.Stage(Object.keys(exports.AllScenes).map((key) => { return exports.AllScenes[key]; }), { default: default_wizard, ttl: (ONEHOUR) }));
        });
    });
};
exports.PluginInit = PluginInit;
const GetTriggers = () => {
    return AllTriggers;
};
exports.GetTriggers = GetTriggers;
const ProcessTriggers = (bot, socket) => {
    //console.log('>>>>ProcessTriggers')
    Object.keys(AllTriggers).map((name) => {
        let triggers = AllTriggers[name];
        triggers.map((trigger) => {
            console.log('>>Reg Command', name, trigger);
            bot.command(trigger, (_ctx) => {
                console.log('>>Cmd Triggered', name, trigger);
                _ctx.reply(`Starting ${name}`).then((d) => {
                    //console.log(`....${d}`)
                    //console.log(Object.keys(_ctx))
                    console.log(`Starting ${name} with ${trigger}`);
                    try {
                        console.log('processTriggers.socket', socket);
                        (0, tg_1.clear_ctx)(_ctx);
                        if (socket != undefined) {
                            console.log('socket is loaded');
                            _ctx.scene.enter(name, { socket: socket });
                            // socket.on('server-broadcast',(payload:any)=>{
                            //     console.log('xxxxxxxx')
                            //     _ctx.reply(JSON.stringify(payload))
                            // })
                        }
                        else {
                            _ctx.scene.enter(name);
                        }
                    }
                    catch (e) {
                        console.log('error', e);
                        throw ('Unable to start scene');
                    }
                });
            });
        });
    });
};
exports.ProcessTriggers = ProcessTriggers;
