import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const messageCollection = "Messages"

const messageSchema = new mongoose.Schema(

    {
        user: { type: String, require: true, max:100},
        message: { type: String, require: true, max:200}
    }
)

const messageModel = mongoose.model(messageCollection, messageSchema)

export default messageModel