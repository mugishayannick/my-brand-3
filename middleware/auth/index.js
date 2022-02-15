import jwt from "jsonwebtoken";

// DB
// const User = require("../../models/user");


// Authentication
export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader ? authHeader.split(" ")[1] : '';
    console.log(req.headers);
    if (token == '') return res.sendStatus(401);
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err){        console.log(err); return res.sendStatus(403);}
      req.user = user;
      console.log(user);
      next();
    });
  }

 
