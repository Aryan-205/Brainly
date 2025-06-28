import mongoose from "mongoose";

mongoose.connect('mongodb+srv://DbAryan:9NilUUNaTDkwm2Zt@cluster0.fwkwn.mongodb.net/Brainly')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const contentTypes = ['image', 'video', 'article', 'audio'];

const UserSchema = new Schema({
  username:{type:String, unique:true, required:true},
  password:{type:String, required:true}
})

const ContentSchema = new Schema({
  link:{type:String, required:true},
  type:{type:String, enum:contentTypes, required:true},
  title:{type:String, required: true},
  userId:{type: ObjectId, ref:'UserSchema', required:true},
  tagId:{type: ObjectId, ref:'TagSchema'}
})

const TagSchema = new Schema({
  title:{type:String, required:true}
})

const linkSchema = new Schema({
  hash:{type:String, required:true},
  userId:{type:Object, ref:"UserSchema", required:true}
})

export const User = mongoose.model('User',UserSchema)
export const Content = mongoose.model('Content',ContentSchema)
export const Link = mongoose.model('Link',linkSchema)
export const Tag = mongoose.model('Tag',TagSchema)