import dotenv from 'dotenv-flow'
dotenv.config();
import express from "express";
import Mongoose from "mongoose";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import messageRoutes from "./routes/message.js";
import articleRoutes from "./routes/article.js"
// import serve  from "swagger-ui-express";
import auth from './routes/auth.js';






Mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true, })
.then(() => {
    console.log('Successfully connected to Mongoose !');
})
.catch((error) => {
    console.log('Unable to connect to Mongoose !');
    console.error(error);
})



const options = {
    apis: ["./routes/*.js"],
    definition: {
        openapi: "3.0.0",
    },
    info: {
        title: "Message API",
        version: "1.0.0",
        description: "A simple express message API"
    },
    
    servers: [
        {
            url:"http:localhost:8000/"
        }
    ],
    
    
};


// const options = {
//     //Those are the specs of swagger
//     apis : ["./routes/*.js"],
//     definition: {
//        openapi: '3.0.0',
//       info: {
//         title: 'Yannick brand portfolio project api',
//         version: '1.0.0',
//         description:
//           "API for my project which include the Article API, Message API it have all CRUD operations\
//            authentication and its authorizations",
//       },
//       servers: [
//         {
//             url:"http:localhost:8000/"
//         }
//     ],
//       paths: {},
//       security: [
//         {
//           bearerAuth: [],
//         },
//       ],
//       components: {
//           securitySchemes: {
//             bearerAuth: {
//               type: 'http',
//               scheme: 'bearer',
//               bearerFormat: 'JWT',
//               name: 'bearerAuth',
//               in: 'header'
//             }
//           }}
//           }
//   };
const specs = swaggerJsDoc(options)

const app = express()
app.use(express.json());
app.use('/api/message',messageRoutes);
app.use('/api/post',articleRoutes);





app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))
app.use('/api/auth', auth);




export  {app};
