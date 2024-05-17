import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("User Not Authorized", 400));
  }
  // console.log(token);
  // console.log("fredfvs");
  // const decoded = await jwt.verify(token, process.env.JWT_KEY);
  // req.user = await User.findById(decoded.id);
  try {
    const decoded = await jwt.verify(token, process.env.JWT_KEY);
    console.log("decode", decoded);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return next(new ErrorHandler("Invalid Token", 401));
  }
  next();
});