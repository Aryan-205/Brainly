"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = exports.Link = exports.Content = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect('mongodb+srv://DbAryan:9NilUUNaTDkwm2Zt@cluster0.fwkwn.mongodb.net/Brainly');
const Schema = mongoose_1.default.Schema;
const ObjectId = Schema.ObjectId;
const contentTypes = ['image', 'video', 'article', 'audio'];
const UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});
const ContentSchema = new Schema({
    link: { type: String, required: true },
    type: { type: String, enum: contentTypes, required: true },
    title: { type: String, required: true },
    userId: { type: ObjectId, ref: 'UserSchema', required: true },
    tagId: { type: ObjectId, ref: 'TagSchema' }
});
const TagSchema = new Schema({
    title: { type: String, required: true }
});
const linkSchema = new Schema({
    hash: { type: String, required: true },
    userId: { type: Object, ref: "UserSchema", required: true }
});
exports.User = mongoose_1.default.model('User', UserSchema);
exports.Content = mongoose_1.default.model('Content', ContentSchema);
exports.Link = mongoose_1.default.model('Link', linkSchema);
exports.Tag = mongoose_1.default.model('Tag', TagSchema);
