"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_download_path = exports.set_state = exports.clear_state = exports.get_state_property = exports.set_state_property = exports.init_state = exports.check_email = exports.clear_ctx = exports.check_ctx_type = exports.kbd_inline = exports.kbd_reply = exports.TG_TYPES = void 0;
const telegraf_1 = require("telegraf");
const mongoose_1 = require("../../db/mongoose");
const axios_1 = __importDefault(require("axios"));
exports.TG_TYPES = {
    'CB_QUERY': 'callback_query',
    'TEXT': 'text'
};
const kbd_reply = (ctx, msg, options) => {
    //https://javascript.hotexamples.com/examples/telegraf/Markup/keyboard/javascript-markup-keyboard-method-examples.html
    return ctx.reply('message', telegraf_1.Markup.keyboard(options).oneTime());
};
exports.kbd_reply = kbd_reply;
const kbd_inline = (options, selected_options = null, items_per_row = 2) => {
    if (items_per_row < 1)
        items_per_row = 1;
    return new Promise((resolve, reject) => {
        let all_buttons = [
            [
                telegraf_1.Markup.button.callback('one two three', 'count'),
                telegraf_1.Markup.button.callback('a b c', 'alphabet')
            ]
        ];
        if (options && options.length > 0) {
            all_buttons = [];
            let row = [];
            let counter = 1;
            options.map((o) => {
                //console.log('ooo',o)
                let label = o.text;
                if (selected_options === null || selected_options === void 0 ? void 0 : selected_options.length) {
                    console.log('selected', selected_options, o.cbvalue);
                    if (selected_options.indexOf(o.cbvalue) >= 0) {
                        label = `${label} [T]`;
                    }
                }
                switch (true) {
                    case (o.cbvalue != undefined):
                        row.push(telegraf_1.Markup.button.callback(`${counter}. ${label}`, o.cbvalue));
                        break;
                    case (o.url != undefined):
                        row.push(telegraf_1.Markup.button.url(`${counter}. ${label}`, o.url));
                        break;
                }
                counter++;
                if ((row.length > 0) && (row.length >= items_per_row)) {
                    all_buttons.push(row);
                    row = [];
                }
            });
            if (row.length > 0) {
                all_buttons.push(row);
                row = [];
            }
        }
        resolve(telegraf_1.Markup.inlineKeyboard(all_buttons));
    });
};
exports.kbd_inline = kbd_inline;
const check_ctx_type = (ctx) => {
    return new Promise((resolve, reject) => {
        var _a, _b, _c, _d;
        let result = null;
        console.log(Object.keys(ctx.update));
        switch (true) {
            case (((_b = (_a = ctx.update) === null || _a === void 0 ? void 0 : _a.callback_query) === null || _b === void 0 ? void 0 : _b.data) != undefined):
                //console.log('before flush',ctx)
                console.log(ctx);
                ctx.editMessageText('[menu used]', null);
                console.log('>CALLBACK_QUERY');
                result = { type: exports.TG_TYPES.CB_QUERY, data: ctx.update.callback_query.data, raw: ctx.update.callback_query };
                (0, exports.clear_ctx)(ctx);
                //console.log('flushed',ctx)
                break;
            case (((_d = (_c = ctx.update) === null || _c === void 0 ? void 0 : _c.message) === null || _d === void 0 ? void 0 : _d.text) != undefined):
                console.log('>TEXT');
                result = { type: exports.TG_TYPES.TEXT, data: ctx.update.message.text, raw: ctx.update };
                (0, exports.clear_ctx)(ctx);
                break;
            default:
            //console.log('update',ctx.update)
        }
        console.log('cursor', ctx.wizard.cursor);
        console.log('result', result);
        resolve(result);
    });
};
exports.check_ctx_type = check_ctx_type;
const clear_ctx = (ctx) => {
    var _a, _b, _c, _d;
    if ((_b = (_a = ctx.update) === null || _a === void 0 ? void 0 : _a.callback_query) === null || _b === void 0 ? void 0 : _b.data)
        delete ctx.update.callback_query.data;
    if ((_d = (_c = ctx.update) === null || _c === void 0 ? void 0 : _c.message) === null || _d === void 0 ? void 0 : _d.text)
        delete ctx.update.message.text;
};
exports.clear_ctx = clear_ctx;
const check_email = (str) => {
    // check text for email
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return new Promise((resolve, reject) => {
        if (str != undefined) {
            if (re.test(str)) {
                resolve(str);
            }
            else {
                resolve(null);
            }
        }
        else {
            resolve(null);
        }
    });
};
exports.check_email = check_email;
const get_scene_properties = (ctx) => {
    var _a, _b, _c, _d, _e, _f;
    const scene = (_b = (_a = ctx.session) === null || _a === void 0 ? void 0 : _a.__scenes) === null || _b === void 0 ? void 0 : _b.current;
    let userid = (_d = (_c = ctx.update.message) === null || _c === void 0 ? void 0 : _c.chat) === null || _d === void 0 ? void 0 : _d.id;
    if (userid == undefined) {
        userid = (_f = (_e = ctx.update.callback_query) === null || _e === void 0 ? void 0 : _e.from) === null || _f === void 0 ? void 0 : _f.id;
    }
    return { scene: scene, userid: userid };
};
const init_state = (ctx) => {
    return new Promise((resolve, reject) => {
        const scene_prop = get_scene_properties(ctx);
        if (scene_prop.scene == undefined || scene_prop.userid == undefined) {
            console.log('CTX', ctx);
            reject(`rejected name:${scene_prop.scene} userid:${scene_prop.userid}`);
        }
        (0, mongoose_1.get_state)(scene_prop.userid, scene_prop.scene).then((state) => {
            var _a, _b;
            console.log('retrieved state', state);
            if ((state === null || state === void 0 ? void 0 : state.data) != undefined) {
                ctx.wizard.state.data = state.data;
                resolve(state.data);
            }
            else {
                console.log('scene', scene_prop.scene, 'user', scene_prop.userid);
                if (((_a = ctx.wizard.state) === null || _a === void 0 ? void 0 : _a.data) == undefined || ((_b = ctx.wizard.state) === null || _b === void 0 ? void 0 : _b.data) == null)
                    ctx.wizard.state['data'] = {};
                (0, exports.set_state)(ctx, ctx.wizard.state.data).then((d) => {
                    resolve(d);
                }).catch((e) => {
                    reject(e);
                });
            }
        });
    });
};
exports.init_state = init_state;
const set_state_property = (ctx, property_name, value) => {
    const scene_prop = get_scene_properties(ctx);
    return new Promise((resolve, reject) => {
        (0, mongoose_1.get_state)(scene_prop.userid, scene_prop.scene).then((sd) => {
            let scene_data = sd === null || sd === void 0 ? void 0 : sd.data;
            if (scene_data == undefined) {
                scene_data = {};
            }
            scene_data[property_name] = value;
            (0, mongoose_1.save_state)(scene_prop.userid, scene_prop.scene, scene_data).then((_) => {
                resolve(_);
            }).catch((e) => {
                reject(e);
            });
        });
    });
};
exports.set_state_property = set_state_property;
const get_state_property = (ctx, property_name) => {
    const scene_prop = get_scene_properties(ctx);
    return new Promise((resolve, reject) => {
        (0, mongoose_1.get_state)(scene_prop.userid, scene_prop.scene).then((sd) => {
            let scene_data = sd === null || sd === void 0 ? void 0 : sd.data;
            resolve(scene_data[`${property_name}`]);
        });
    });
};
exports.get_state_property = get_state_property;
const clear_state = (ctx, scene_name = null, property_name = null) => {
    const scene_prop = get_scene_properties(ctx);
    if (scene_name != null)
        scene_prop.scene = scene_name;
    return new Promise((resolve, reject) => {
        (0, mongoose_1.get_state)(scene_prop.userid, scene_prop.scene).then((sd) => {
            let scene_data = sd === null || sd === void 0 ? void 0 : sd.data;
            if (scene_data == undefined || scene_data == null)
                scene_data = {};
            if (property_name != null && Object.keys(scene_data).indexOf(property_name) >= 0) {
                delete scene_data[`${property_name}`];
            }
            else {
                scene_data = {};
            }
            console.log('before delete', scene_data);
            (0, mongoose_1.save_state)(scene_prop.userid, scene_prop.scene, scene_data).then((d) => {
                console.log('after delete', d);
                resolve(d);
            }).catch((e) => {
                reject(e);
            });
        });
    });
};
exports.clear_state = clear_state;
const set_state = (ctx, data = null) => {
    var _a, _b;
    const scene_prop = get_scene_properties(ctx);
    if (data == null)
        data = (_b = (_a = ctx.wizard) === null || _a === void 0 ? void 0 : _a.state) === null || _b === void 0 ? void 0 : _b.data;
    return new Promise((resolve, reject) => {
        if (data == null || data == undefined) {
            console.log('---no data to save---');
            resolve(null);
        }
        (0, mongoose_1.save_state)(scene_prop.userid, scene_prop.scene, data).then((d) => {
            resolve(d);
        }).catch((e) => {
            reject(e);
        });
    });
};
exports.set_state = set_state;
const get_download_path = (file_id) => {
    return new Promise((resolve, reject) => {
        axios_1.default.get(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/getfile?file_id=${file_id}`)
            .then((response) => {
            var _a, _b;
            console.log('got', (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.result);
            resolve((_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b.result);
        })
            .catch((error) => {
            reject(error);
        });
    });
};
exports.get_download_path = get_download_path;
