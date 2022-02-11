import Mongoose from "mongoose";

const messageSchema = new Mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true }


});

const Message = Mongoose.model("Message", messageSchema);

export default Message

