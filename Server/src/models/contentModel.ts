import mongoose, {Types} from "mongoose"

const contentSchema = new mongoose.Schema({
  link:{type: String,required: true},
  contentType: {type: String, required: true},
  title: {type: String, required: true},
  tag: {type: String, required: true},
  userId: {type: Types.ObjectId, ref: 'User', required: true}
})

const userContent = mongoose.model("content",contentSchema);
export default userContent;