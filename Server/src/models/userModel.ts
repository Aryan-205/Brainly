import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String,required:true,unique:true},
  password: {type:String,required: true}
})

const user = mongoose.model("User",userSchema);

export default user;