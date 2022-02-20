import mongoose from 'mongoose';



const commentSchema = new mongoose.Schema({
    author: String,
    comment: String

});

const comment = mongoose.model("comment", commentSchema)


export default comment;