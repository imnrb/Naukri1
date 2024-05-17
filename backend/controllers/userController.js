import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from '../middlewares/error.js';
import { User } from "../models/userSchema.js";
import {sendToken} from "../utils/jwtToken.js"
//register user
export const register=catchAsyncErrors(async(req,res,next)=>{
    const {name,phone,email,role,password}=req.body;
    if(!name||!phone||!email||!role||!password)
    {
        return next( new ErrorHandler("Please fill all details"));
    }
    const isEmail= await User.findOne({email});
    if(isEmail)
    {
        return next(new ErrorHandler("Email already exists"))
    }
    const user=await User.create({
        name,
        phone,
        email,
        role,
        password
    });
    sendToken(user,200,res,"User registered succesfully");
})
//login user
export const login=catchAsyncErrors(async (req,res,next)=>{
    const{email,password,role}=req.body;
    if(!email||!password||!role){
        return next( new ErrorHandler("Please fill all details",400))
    }
    const user=await User.findOne({email}).select("+password"); //findOne is used to find a single document matching the specified criteria.select is used to specify which fields should be included or excluded in the returned document.
    if(!user)
    {
        return next(new ErrorHandler("Invalid email or password",400))
    }
    const isPasswordMatched= await user.comparePassword(password);
    console.log(isPasswordMatched);
    if(!isPasswordMatched)
    {
        return next(new ErrorHandler("Invalid email or password",400))
    }
    if(user.role!=role)
    {
        return next(new ErrorHandler("User with this role not found",400))
    }
    console.log(sendToken(user,200,res,"User logged in succesfully"));
})

export const logout = catchAsyncErrors(async (req, res, next) => {
    res
      .status(201)
      .cookie("token", "", {
        httpOnly: true,
        expires: new Dte(Date.now()),
      })
      .json({
        success: true,
        message: "Logged Out Successfully.",
      });
  });