import mongoose from 'mongoose';



const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: String, required: true },

});

const article = mongoose.model("article", articleSchema)


export default article;