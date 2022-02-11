// const { promisify } = require("util");
import jwt from "jsonwebtoken";
import {config} from "dotenv";

config();

// DB
// const User = require("../../models/user");


// Authentication
export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["Authorization"];
    const token = authHeader && authHeader.split(" ")[1];
  
    if (token == undefined) return res.sendStatus(401);
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.log(token);
      if (err) return res.sendStatus(403);
      req.user = user;
      console.log(user);
      next();
    });
  }

 
