import mongoose from 'mongoose';




const articleSchema = new mongoose.Schema({
    title: { type: String},
    content: { type: String},
    imageUrl: { type: String },
    userId: { type: String},
    // comments: [
    //     {
    //         type:  { type: String},
    //         ref:  { type: String},
    //     }
    // ]

});

const article = mongoose.model("article", articleSchema)


export default article;