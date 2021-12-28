"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.check_ctx_for = exports.FWizard = exports.DATATYPE = void 0;
const telegraf_1 = require("telegraf");
const socket_client_bridge_1 = require("../../lib/socket_client_bridge");
const tg_1 = require("../../lib/tg");
exports.DATATYPE = {
    'CB_QUERY': 'cb_query',
    'CB_QUERY_MULTI': 'cb_query_multi',
    'TEXT': 'text',
    'NUMBER': 'number',
    'DATE': 'date',
    'EMAIL': 'email',
    'PHOTO': 'photo',
    'VIDEO': 'video',
    'AUDIO': 'audio',
    'DOCUMENT': 'document',
    'CONFIRMCANCEL': 'confirmcancel',
    'LOCATION': 'location'
};
class FWizard extends telegraf_1.Scenes.WizardScene {
    constructor(name, ...steps) {
        super(name, ...steps);
        this.name = undefined;
        let _ = new socket_client_bridge_1.SSocket();
        FWizard.socket = _.getSocket();
        if (FWizard.socket != undefined && FWizard.socket != null) {
            FWizard.socket.emit('tg-signal', { data: `Wizard Initialized ${name}` });
        }
        this.use(Events);
    }
    static next(ctx, step = null) {
        if (step == null) {
            ctx.wizard.next();
        }
        else {
            ctx.wizard.selectStep(step);
        }
        return ctx.wizard.steps[ctx.wizard.cursor](ctx);
    }
    static leaveWizard(ctx) {
        var _a;
        (_a = FWizard.socket) === null || _a === void 0 ? void 0 : _a.emit('tg-signal', { data: `Exiting ${this.name}` });
        ctx.scene.leave();
    }
}
exports.FWizard = FWizard;
FWizard.socket = undefined;
const Events = (ctx, next) => {
    console.log('middleware ----------======|');
    console.log(Object.keys(ctx.update));
    return next();
    // bot.on('text',(ctx:any)=>{
    //     console.log('------------>')
    //     next()
    // })
};
const check_ctx_for = (ctx, datatype, message = null, options = null, selected_options = null) => {
    return new Promise((resolve, reject) => {
        let result = { type: null, value: null };
        let value = null;
        new Promise((resolve, reject) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63, _64, _65, _66, _67;
            switch (datatype) {
                case exports.DATATYPE.DATE:
                    //https://github.com/wanasit/chrono
                    if (((_b = (_a = ctx.update) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.text) != undefined && ((_d = (_c = ctx.update) === null || _c === void 0 ? void 0 : _c.message) === null || _d === void 0 ? void 0 : _d.text) != null) {
                        //message=null
                        value = ctx.update.message.text;
                        if ((!isNaN(value.trim())) && !isNaN(parseFloat(value.trim()))) {
                            result.type = exports.DATATYPE.NUMBER;
                            result.value = value;
                            delete ctx.update.message.text;
                            resolve(result);
                        }
                        else {
                            resolve(null);
                        }
                    }
                    break;
                case exports.DATATYPE.EMAIL:
                    console.log(':::email');
                    if (((_f = (_e = ctx.update) === null || _e === void 0 ? void 0 : _e.message) === null || _f === void 0 ? void 0 : _f.text) != undefined && ((_h = (_g = ctx.update) === null || _g === void 0 ? void 0 : _g.message) === null || _h === void 0 ? void 0 : _h.text) != null) {
                        //message = null
                        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                        if (re.test(ctx.update.message.text)) {
                            result.type = exports.DATATYPE.EMAIL;
                            result.value = ctx.update.message.text;
                            delete ctx.update.message.text;
                            resolve(result);
                        }
                        else {
                            resolve(null);
                        }
                    }
                    break;
                case exports.DATATYPE.TEXT:
                    if (((_k = (_j = ctx.update) === null || _j === void 0 ? void 0 : _j.message) === null || _k === void 0 ? void 0 : _k.text) != undefined && ((_m = (_l = ctx.update) === null || _l === void 0 ? void 0 : _l.message) === null || _m === void 0 ? void 0 : _m.text) != null) {
                        result.type = exports.DATATYPE.TEXT;
                        result.value = ctx.update.message.text;
                        delete ctx.update.message.text;
                        resolve(result);
                    }
                    else {
                        resolve(null);
                    }
                    break;
                case exports.DATATYPE.NUMBER:
                    if (((_p = (_o = ctx.update) === null || _o === void 0 ? void 0 : _o.message) === null || _p === void 0 ? void 0 : _p.text) != undefined && ((_r = (_q = ctx.update) === null || _q === void 0 ? void 0 : _q.message) === null || _r === void 0 ? void 0 : _r.text) != null) {
                        //message = null
                        value = ctx.update.message.text;
                        if ((!isNaN(value.trim())) && !isNaN(parseFloat(value.trim()))) {
                            result.type = exports.DATATYPE.NUMBER;
                            result.value = value;
                            delete ctx.update.message.text;
                            resolve(result);
                        }
                        else {
                            resolve(null);
                        }
                    }
                    //console.log(ctx.update)
                    break;
                case exports.DATATYPE.PHOTO:
                    console.log('photo?', (_t = (_s = ctx.update) === null || _s === void 0 ? void 0 : _s.message) === null || _t === void 0 ? void 0 : _t.photo);
                    if (((_v = (_u = ctx.update) === null || _u === void 0 ? void 0 : _u.message) === null || _v === void 0 ? void 0 : _v.photo) != undefined && ((_x = (_w = ctx.update) === null || _w === void 0 ? void 0 : _w.message) === null || _x === void 0 ? void 0 : _x.photo) != null) {
                        //message = null
                        let allmedia = (_z = (_y = ctx.update) === null || _y === void 0 ? void 0 : _y.message) === null || _z === void 0 ? void 0 : _z.photo;
                        value = allmedia[allmedia.length - 1];
                        console.log('value', value);
                        if ((value === null || value === void 0 ? void 0 : value.file_id) != undefined) {
                            result.type = exports.DATATYPE.PHOTO;
                            result.value = value;
                            delete ctx.update.message.photo;
                            resolve(result);
                        }
                        else {
                            resolve(null);
                        }
                    }
                    //console.log(ctx.update)
                    break;
                case exports.DATATYPE.AUDIO:
                    console.log('audio?', (_1 = (_0 = ctx.update) === null || _0 === void 0 ? void 0 : _0.message) === null || _1 === void 0 ? void 0 : _1.voice);
                    if (((_3 = (_2 = ctx.update) === null || _2 === void 0 ? void 0 : _2.message) === null || _3 === void 0 ? void 0 : _3.voice) != undefined && ((_5 = (_4 = ctx.update) === null || _4 === void 0 ? void 0 : _4.message) === null || _5 === void 0 ? void 0 : _5.voice) != null) {
                        //message = null
                        //let allmedia = ctx.update?.message?.photo
                        value = (_7 = (_6 = ctx.update) === null || _6 === void 0 ? void 0 : _6.message) === null || _7 === void 0 ? void 0 : _7.voice;
                        console.log('value', value);
                        if ((value === null || value === void 0 ? void 0 : value.file_id) != undefined) {
                            result.type = exports.DATATYPE.AUDIO;
                            result.value = value;
                            delete ctx.update.message.voice;
                            resolve(result);
                        }
                        else {
                            resolve(null);
                        }
                    }
                    //console.log(ctx.update)
                    break;
                case exports.DATATYPE.VIDEO:
                    console.log('video?', (_9 = (_8 = ctx.update) === null || _8 === void 0 ? void 0 : _8.message) === null || _9 === void 0 ? void 0 : _9.video);
                    if (((_11 = (_10 = ctx.update) === null || _10 === void 0 ? void 0 : _10.message) === null || _11 === void 0 ? void 0 : _11.video) != undefined && ((_13 = (_12 = ctx.update) === null || _12 === void 0 ? void 0 : _12.message) === null || _13 === void 0 ? void 0 : _13.video) != null) {
                        //message = null
                        //let allmedia = ctx.update?.message?.photo
                        value = (_15 = (_14 = ctx.update) === null || _14 === void 0 ? void 0 : _14.message) === null || _15 === void 0 ? void 0 : _15.video;
                        console.log('value', value);
                        if ((value === null || value === void 0 ? void 0 : value.file_id) != undefined) {
                            result.type = exports.DATATYPE.VIDEO;
                            result.value = value;
                            delete ctx.update.message.video;
                            resolve(result);
                        }
                        else {
                            resolve(null);
                        }
                    }
                    //console.log(ctx.update)
                    break;
                case exports.DATATYPE.DOCUMENT:
                    console.log('document?', (_17 = (_16 = ctx.update) === null || _16 === void 0 ? void 0 : _16.message) === null || _17 === void 0 ? void 0 : _17.document);
                    if (((_19 = (_18 = ctx.update) === null || _18 === void 0 ? void 0 : _18.message) === null || _19 === void 0 ? void 0 : _19.document) != undefined && ((_21 = (_20 = ctx.update) === null || _20 === void 0 ? void 0 : _20.message) === null || _21 === void 0 ? void 0 : _21.document) != null) {
                        //message = null
                        //let allmedia = ctx.update?.message?.photo
                        value = (_23 = (_22 = ctx.update) === null || _22 === void 0 ? void 0 : _22.message) === null || _23 === void 0 ? void 0 : _23.document;
                        console.log('value', value);
                        if ((value === null || value === void 0 ? void 0 : value.file_id) != undefined) {
                            result.type = exports.DATATYPE.DOCUMENT;
                            result.value = value;
                            delete ctx.update.message.document;
                            resolve(result);
                        }
                        else {
                            resolve(null);
                        }
                    }
                    //console.log(ctx.update)
                    break;
                case exports.DATATYPE.LOCATION:
                    console.log('location?', (_25 = (_24 = ctx.update) === null || _24 === void 0 ? void 0 : _24.message) === null || _25 === void 0 ? void 0 : _25.location);
                    if (((_27 = (_26 = ctx.update) === null || _26 === void 0 ? void 0 : _26.message) === null || _27 === void 0 ? void 0 : _27.location) != undefined && ((_29 = (_28 = ctx.update) === null || _28 === void 0 ? void 0 : _28.message) === null || _29 === void 0 ? void 0 : _29.location) != null) {
                        //message = null
                        //let allmedia = ctx.update?.message?.photo
                        value = (_31 = (_30 = ctx.update) === null || _30 === void 0 ? void 0 : _30.message) === null || _31 === void 0 ? void 0 : _31.location;
                        console.log('value', value);
                        if ((value === null || value === void 0 ? void 0 : value.latitude) != undefined) {
                            result.type = exports.DATATYPE.LOCATION;
                            result.value = value;
                            delete ctx.update.message.location;
                            resolve(result);
                        }
                        else {
                            resolve(null);
                        }
                    }
                    //console.log(ctx.update)
                    break;
                case exports.DATATYPE.CB_QUERY:
                    console.log('cb_query', (_33 = (_32 = ctx.update) === null || _32 === void 0 ? void 0 : _32.callback_query) === null || _33 === void 0 ? void 0 : _33.data);
                    if (((_35 = (_34 = ctx.update) === null || _34 === void 0 ? void 0 : _34.message) === null || _35 === void 0 ? void 0 : _35.text) != undefined && ((_37 = (_36 = ctx.update) === null || _36 === void 0 ? void 0 : _36.message) === null || _37 === void 0 ? void 0 : _37.text) != null) {
                        // did someone enter a number?
                        value = ctx.update.message.text;
                        if ((!isNaN(value.trim())) && !isNaN(parseFloat(value.trim()))) {
                            let answer = parseInt(value.trim()) - 1;
                            console.log('answer is', answer);
                            if (answer >= 0 && answer < options.length) {
                                value = (_38 = options[answer]) === null || _38 === void 0 ? void 0 : _38.cbvalue;
                                if (value == undefined) {
                                    value = (_39 = options[answer]) === null || _39 === void 0 ? void 0 : _39.url;
                                    if ((_40 = options[answer]) === null || _40 === void 0 ? void 0 : _40.url)
                                        ctx.reply(`Click on this link ${options[answer].url}`);
                                }
                                delete ctx.update.message.text;
                                result.type = exports.DATATYPE.CB_QUERY;
                                result.value = value;
                                resolve(result);
                            }
                        }
                    }
                    if (((_42 = (_41 = ctx.update) === null || _41 === void 0 ? void 0 : _41.callback_query) === null || _42 === void 0 ? void 0 : _42.data) != undefined && ((_44 = (_43 = ctx.update) === null || _43 === void 0 ? void 0 : _43.callback_query) === null || _44 === void 0 ? void 0 : _44.data) != null) {
                        ctx.editMessageText('[menu used]', null);
                        value = ctx.update.callback_query.data;
                        result.type = exports.DATATYPE.CB_QUERY;
                        result.value = ctx.update.callback_query.data;
                        delete ctx.update.callback_query.data;
                        resolve(result);
                    }
                    else {
                        resolve(null);
                    }
                    break;
                case exports.DATATYPE.CB_QUERY_MULTI:
                    console.log('cb_query_multi', (_46 = (_45 = ctx.update) === null || _45 === void 0 ? void 0 : _45.callback_query) === null || _46 === void 0 ? void 0 : _46.data);
                    if (((_48 = (_47 = ctx.update) === null || _47 === void 0 ? void 0 : _47.message) === null || _48 === void 0 ? void 0 : _48.text) != undefined && ((_50 = (_49 = ctx.update) === null || _49 === void 0 ? void 0 : _49.message) === null || _50 === void 0 ? void 0 : _50.text) != null) {
                        // did someone enter a number?
                        value = ctx.update.message.text;
                        if ((!isNaN(value.trim())) && !isNaN(parseFloat(value.trim()))) {
                            let answer = parseInt(value.trim()) - 1;
                            console.log('answer is', answer);
                            if (answer >= 0 && answer < options.length) {
                                value = (_51 = options[answer]) === null || _51 === void 0 ? void 0 : _51.cbvalue;
                                if (value == undefined) {
                                    value = (_52 = options[answer]) === null || _52 === void 0 ? void 0 : _52.url;
                                    if ((_53 = options[answer]) === null || _53 === void 0 ? void 0 : _53.url)
                                        ctx.reply(`Click on this link ${options[answer].url}`);
                                }
                                delete ctx.update.message.text;
                                result.type = exports.DATATYPE.CB_QUERY_MULTI;
                                result.value = value;
                                resolve(result);
                            }
                        }
                    }
                    if (((_55 = (_54 = ctx.update) === null || _54 === void 0 ? void 0 : _54.callback_query) === null || _55 === void 0 ? void 0 : _55.data) != undefined && ((_57 = (_56 = ctx.update) === null || _56 === void 0 ? void 0 : _56.callback_query) === null || _57 === void 0 ? void 0 : _57.data) != null) {
                        value = ctx.update.callback_query.data;
                        result.type = exports.DATATYPE.CB_QUERY_MULTI;
                        result.value = ctx.update.callback_query.data;
                        delete ctx.update.callback_query.data;
                        resolve(result);
                    }
                    else {
                        resolve(null);
                    }
                    break;
                case exports.DATATYPE.CONFIRMCANCEL:
                    /*
                    resolves boolean (true=confirm, false=cancel, null=unknown)
                    */
                    options = [{ text: 'Confirm', cbvalue: 'confirm' }, { text: 'Cancel', cbvalue: 'cancel' }];
                    if (((_59 = (_58 = ctx.update) === null || _58 === void 0 ? void 0 : _58.message) === null || _59 === void 0 ? void 0 : _59.text) != undefined && ((_61 = (_60 = ctx.update) === null || _60 === void 0 ? void 0 : _60.message) === null || _61 === void 0 ? void 0 : _61.text) != null) {
                        value = ctx.update.message.text;
                        if ((!isNaN(value.trim())) && !isNaN(parseFloat(value.trim()))) {
                            console.log(options.length);
                            let answer = parseInt(value.trim()) - 1;
                            if (answer >= 0 && answer < options.length) {
                                value = (((_62 = options[answer]) === null || _62 === void 0 ? void 0 : _62.cbvalue) == 'confirm');
                                delete ctx.update.message.text;
                                result.type = exports.DATATYPE.CB_QUERY;
                                result.value = value;
                                ctx.reply(`(${(_63 = options[answer]) === null || _63 === void 0 ? void 0 : _63.text})`);
                                resolve(result);
                            }
                        }
                    }
                    //console.log('confirmcancel',ctx.update?.callback_query?.data)
                    if (((_65 = (_64 = ctx.update) === null || _64 === void 0 ? void 0 : _64.callback_query) === null || _65 === void 0 ? void 0 : _65.data) != undefined && ((_67 = (_66 = ctx.update) === null || _66 === void 0 ? void 0 : _66.callback_query) === null || _67 === void 0 ? void 0 : _67.data) != null) {
                        ctx.editMessageText('[menu used]', null);
                        value = (ctx.update.callback_query.data == 'confirm');
                        result.type = exports.DATATYPE.CONFIRMCANCEL;
                        result.value = value;
                        delete ctx.update.callback_query.data;
                        resolve(result);
                    }
                    else {
                        resolve(null);
                    }
                    break;
            }
            resolve(null);
        }).then((res) => {
            if (res == null) {
                //console.log(ctx)
                if (message != null) {
                    console.log('message');
                    if (options != null) {
                        (0, tg_1.kbd_inline)(options, selected_options, 1).then((kbd) => {
                            ctx.reply(message, kbd).then((dd) => {
                                resolve(false);
                            });
                        });
                    }
                    else {
                        ctx.reply(message).then((dd) => {
                            console.log('beep');
                            resolve(false);
                        });
                    }
                }
                else {
                    resolve(false);
                }
            }
            else {
                resolve(res);
            }
        });
    });
};
exports.check_ctx_for = check_ctx_for;
