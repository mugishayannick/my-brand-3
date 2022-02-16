import User from '../models/user.js';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';


const signToken = (id) => {
    return jwt.sign({ id, role: 'user' }, 'topSecret', {
      expiresIn: '3d',
    });
  };

//handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

    // duplicate error code
    if (err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
    }

    // validatiom errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }

    return errors;

}



export const signup = async (req, res) => {
   // LETS VALIDATE A DATE BEFORE WE MAKE A USER
//    const {error}= registerValidation(req.body);
//    if(error){
//        return res.status(400).send(error.details[0].message);
//    }
  // check if the email is already exists
  const emailExists = await User.findOne({email: req.body.email});
  if(emailExists){
      return res.status(400).send('Email already exists');
  }
  if(req.body.password !== req.body.confirmPassword ){
      return res.status(400).send('passwords do not match')
  }

   // HASH THE PASSWORD

   const salt = await bcrypt.genSalt(10);
   
   const hashedPassword = await bcrypt.hash(req.body.password, salt);
   

   // create a user
   const user =  User({
       firstName: req.body.firstName,
       lastName: req.body.lastName,
       email: req.body.email,
       password: hashedPassword,
       confirmPassword: hashedPassword
       
   });

   try {
       const savedUser = await user.save();
       const token = signToken(savedUser._id);
        const data = {
            token,
            savedUser,
        };
       res.status(201).json(data);
   } catch (error) {
       res.status(400).send(error);
   }

}



export const login = async (req, res) => {
    
   
// check if the email exists
const user = await User.findOne({email: req.body.email});
if(!user){
    return res.status(400).send('Email is not found');
}else {
    const isPasswordValid = await bcrypt.compare(req.body.password, user.confirmPassword);
    console.log(isPasswordValid)
    if(!isPasswordValid){
        return res.status(400).send('incorrect password');
    } else {
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        res.status(201).json(token);

    }

}




// Password is correct!







// exports.protect = async (req, res, next) => {
//     try {
//       let token;
//       if (
//         req.headers.Authorization && req.headers.Authorization.startsWith("Bearer")
//       ) {
//         token = req.headers.Authorization.split(" ")[1];
//       }
//       if (!token) {
//         res.status(500).json({error: true, message: "Unauthorized"});
//       }
  
//       const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
//       const user = await User.findById(decoded.id);
//       if (!user) {
//         res.status(500).json({error: true, message: "Unauthorized"});
//       } else {
//         req.user = user;
//         next();
//       }
//     } catch (err) {
//       console.log(err);
//       res.status(400).json({ err });
//     }
//   };

}
