import dotenvFlow from 'dotenv-flow'
dotenvFlow.config();
import express from "express";
import Mongoose from "mongoose";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import messageRoutes from "./routes/message.js";
// import indexRoute from "./routes/index.js";
import articleRoutes from "./routes/article.js"
// import commentRoutes from "./routes/comment.js"
import auth from './routes/auth.js';
import cors from 'cors';




const app = express()
app.use(express.json());

// API Swager Documentation

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Portfolio API",
            version: "1.0.0",
            description: "This API Will Manage:\n 1. CRUD Operations For The Blog & Message Querries.\n 2. User Roles, User Authentication & Authorisation"
        },
        servers:[{url: 'http://localhost:8000'},{url: 'https://personal-portofolio1.herokuapp.com/'}],
        servers:[{http: 'http://localhost:8000'},{http: 'https://personal-portofolio1.herokuapp.com/'}]
    },
    apis: ['./routes/*.js'],
}

const apiSpecs = swaggerJsDoc(options)


/**
 * Database Connetcion
 */

const dbConnetion = async () => {
    Mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true, })
            .then(() => {
                app.listen(process.env.PORT || 8000, () => {
                    console.log('App Has Started')
                    app.emit('appStarted')
                })
                console.log('MongoDb Atlas Connected')
                console.log('Listening On Port: ' + process.env.PORT)
            })
            .catch((error) => {
                console.log('Unable to connect to MongoDb Atlas!');
                console.error(error);
            })
}
dbConnetion()

// Using Swagger API Documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(apiSpecs))

app.use(cors({
    origin:"*"
}) ) 

// app.use('/', indexRoute)
app.use('/api/message',messageRoutes)
app.use('/api/post', articleRoutes), async (req, res) => {

    const uploader = async (path) => await cloudinary.uploads(path, 'Images')

    if(req.method === 'Post')
    {
        const urls= []

        const files = req.files

        for(const file of files) {
            const { path } = file

            const newPath = await uploader(path)

            urls.push(newPath)

            FileSystem.unlinkSync(path)
        }

        res.status(200).json({
            message: 'Images Uploaded Successfully',
            data:urls
        })
    }else {
        res.status(405).json({
            err:"images not uploaded successfully"
        })
    }
};
app.use('/api/auth', auth);
// app.use('/api/comment', commentRoutes)





export default app;
