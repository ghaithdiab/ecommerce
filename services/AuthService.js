/* eslint-disable import/no-extraneous-dependencies */
import asyncHandler from "express-async-handler";
import bcrypt from 'bcryptjs';
import { createToken } from "../util/createToken.js";
import { ApiErrors } from "../util/ApiErrors.js";

import User from "../modules/UserModule.js";


// @desc    Signup
// @route   GET /api/v1/auth/signup
// @access  Public
export const signUP = asyncHandler(async (req, res, next) => {
  // 1- Create user
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  // 2- Generate token
  const token = createToken(user._id);

  res.status(201).json({ data: user, token:token });
});


// @decs LogIn
// @route POST /api/v1/auth/login
// @acess public  

export const LogIn=asyncHandler(async(req,res,next)=>{

  // 1) check if password and email in the body (validation)
  // 2) check if user exist & check if password is correct
  const user = await User.findOne({ email: req.body.email });

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiErrors('Incorrect email or password', 401));
  }
  // 3) generate token
  const token = createToken(user._id);

  // Delete password from response
  // delete user._doc.password;
  // 4) send response to client side
  res.status(200).json({ data: user, token });
});


export const protect=asyncHandler(async(req,res,next)=>{
  //check if token exist
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) token=req.headers.authorization.split(' ')[1];
  if(!token) return next(new ApiErrors('you are not login please login and try again'));

})