"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_state = exports.save_state = exports.DBConnect = exports.addUserMessage = exports.addUser = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
let connection = null;
const User = new mongoose_1.default.Schema({
    id: { type: Number, required: true, unique: true, index: true },
    username: { type: String, required: true },
    name: { type: String },
    date_added: Date,
    raw_obj: Object
});
const UserMessages = new mongoose_1.default.Schema({
    id: { type: Number, required: true, unique: true, index: true },
    messages: [Object]
});
const Groups = new mongoose_1.default.Schema({
    id: { type: Number, required: true },
    group_id: { type: Number, required: true },
    date_added: Date,
    raw_obj: Object
});
const State = new mongoose_1.default.Schema({
    id: { type: Number, required: true },
    scene: { type: String, required: true },
    date_added: Date,
    data: Object
});
State.index({ id: 1, scene: 1 }, { unique: true });
const mUser = mongoose_1.default.model('user', User);
const mUserMessages = mongoose_1.default.model('user_messages', UserMessages);
const mGroups = mongoose_1.default.model('groups', Groups);
const mState = mongoose_1.default.model('state', State);
// mUser.createIndexes()
// mUserMessages.createIndexes()
// mState.createIndexes()
const addUser = (userObj) => {
    return new Promise((resolve, reject) => {
        let newUser = {};
        newUser['id'] = userObj['id'];
        newUser['username'] = userObj['username'];
        newUser['name'] = userObj['first_name'] + ' ' + userObj['last_name'];
        newUser['raw_obj'] = userObj;
        newUser['date_added'] = new Date();
        const newData = new mUser(newUser);
        mUser.findOneAndUpdate({ id: newUser['id'] }, newUser, { upsert: true }).then((data) => {
            console.log('saved', data);
            resolve(data);
        }).catch((err) => {
            console.log('error', err);
            reject(err);
        });
    });
};
exports.addUser = addUser;
const addUserMessage = (userid, message) => {
    return new Promise((resolve, reject) => {
        mUserMessages.findOneAndUpdate({ id: userid }, { '$push': { 'messages': message } }, { upsert: true })
            .then((data) => {
            resolve(data);
        })
            .catch((err) => {
            reject(err);
        });
    });
};
exports.addUserMessage = addUserMessage;
const DBConnect = () => {
    return new Promise((resolve, reject) => {
        if (connection == null) {
            mongoose_1.default.connect(process.env.MONGOSTR).then((c) => {
                connection = c;
                resolve(c);
            }).catch((e) => {
                reject(e);
            });
        }
        else {
            resolve(connection);
        }
    });
};
exports.DBConnect = DBConnect;
const save_state = (userid, scene, data) => {
    return new Promise((resolve, reject) => {
        data['dt'] = new Date();
        const newData = {
            userid: userid,
            scene: scene,
            date_added: new Date(),
            data: data
        };
        mState.findOneAndUpdate({ id: userid, scene: scene }, newData, { upsert: true })
            .then((d) => { resolve(d); })
            .catch((e) => { reject(e); });
    });
};
exports.save_state = save_state;
const get_state = (userid, scene) => {
    return new Promise((resolve, reject) => {
        mState.findOne({ id: userid, scene: scene })
            .then((d) => { resolve(d); })
            .catch((e) => { reject(e); });
    });
};
exports.get_state = get_state;
