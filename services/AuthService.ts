/* eslint-disable import/no-extraneous-dependencies */
import crypto from 'crypto';
import asyncHandler from "express-async-handler";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { createToken } from "../util/createToken.js";
import { ApiErrors } from "../util/ApiErrors.js";

import {User as userModule} from "../models/UserModel.js";
import { sendEmail } from '../util/sendEmail.js';


// @desc    Signup
// @route   GET /api/v1/auth/signup
// @access  Public
export const signUP = asyncHandler(async (req, res, next) => {
  // 1- Create user
  const user = await userModule.create({
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
  const user = await userModule.findOne({ email: req.body.email });

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
  console.log('test1');
  //check if token exist
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) token=req.headers.authorization.split(' ')[1];
  if(!token) return next(new ApiErrors('you are not login please login and try again'));
  // verfiy token (no change ,expired token)
  const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
  // check if user existe
  const currentUser=await userModule.findById(decoded.userId);
  if(!currentUser) return next(new ApiErrors("user not exsit",401));
  if(!currentUser.active) return next (new ApiErrors("this user is desactive please active your account and try again"));

  // check if user change password after token 

  if(currentUser.passwordChangedAt){
    const tempsStampPasswordChanded=parseInt(
      currentUser.passwordChangedAt.getTime()/1000,10
    )
    if(tempsStampPasswordChanded>decoded.iat) return next (new ApiErrors("user has change his password , please login again",401))
  }
  req.user=currentUser;
  console.log('test2')
  next();
})

export const AllowedTo=(...roles)=>
asyncHandler((req,res,next)=>{
  console.log('test3');
  if(!roles.includes(req.user.role)) {
    return next(new ApiErrors(`You don't have permission`,403));
  }
  console.log('test4');
  next();
})


// @desc forget Password
// @Route POST /api/v1/auth/forgetpassword
// public
export const forgetPassword=asyncHandler(async(req,res,next)=>{
  // check if user exsite (get user by email)
  const user=await userModule.findOne({email:req.body.email});
  if(!user) return next(new ApiErrors('There is no account with this email address',404));
  // gentrate reste code 
  const resetCode=Math.floor(100000+Math.random() *900000).toString();
  const hashResteCode=crypto.createHash('sha256').update(resetCode).digest('hex');

  user.passwordResetCode=hashResteCode;
  // Add expriation time for password (10 min)
  user.passwordResetExpires=Date.now() +10 *60 *1000;
  user.passwordResetVerified=false;

  await user.save();
  // send mail to the user  
    const message = `Hi ${user.name},\n We received a request to reset the password on your E-shop Account. \n ${resetCode} \n Enter this code to complete the reset. \n Thanks for helping us keep your account secure.\n The E-shop Team`;
    try{
      await sendEmail({
        email:user.email,
        subject:'Your password reset code (valid for 10 min)',
        message:message
      }) 
    }catch(err){
      user.passwordResetCode=undefined;
      user.passwordResetExpires=undefined;
      user.passwordResetVerified=undefined;
      await user.save();
      return next(new ApiErrors('There is Error while sending Email',500));
    }

    res.status(200).json({status:'success',message:'Reste code sent to email'});
})


export const verfiyPassResteCode=asyncHandler(async(req,res,next)=>{
  // get hashed code 
  const hashResteCode=crypto.createHash('sha256').update(req.body.resteCode).digest('hex');
  // get user from database 
  const user=await userModule.findOne({
    passwordResetCode:hashResteCode,
    passwordResetExpires:{$gt:Date.now()}
  });
  if(!user) return next(new ApiErrors('Invalid or Expired Reste Code',403));

  //Reset code valid
  user.passwordResetVerified=true;
  await user.save();

  res.status(200).json({status:"success"})
})


export const ResetPassword=asyncHandler(async(req,res,next)=>{
  // Get user from database
  const user=await userModule.findOne({email:req.body.email});
  if (!user) return next(new ApiErrors("No such user found",404));
  // Check if the rest code has been verified
  if (!user.passwordResetVerified) return next(new ApiErrors("Please verify your email first",403));
  // Hash new Password

  user.password=req.body.newPassword;
  user.passwordResetCode=undefined;
  user.passwordResetVerified=undefined;
  user.passwordResetExpires=undefined;
  await user.save();


  const token=createToken(user._id);
  res.status(200).json({token:token});
});


export const getLoggedUserData=asyncHandler((req,res,next)=>{
  req.params.id=req.user._id;
  console.log(req.user._id);
  next();
})
