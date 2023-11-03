/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from 'bcryptjs';
import asyncHandler from "express-async-handler";
import { ApiErrors } from "../util/ApiErrors.js";
import User from "../modules/UserModule.js";
import { createOne, deleteOn, getAll, getOne } from "../modules/hundlersFactory.js";
import { createToken } from '../util/createToken.js';
import {sendEmail} from '../util/sendEmail.js'
//@desc get All Users
//@Route Get /api/v1/USers
//@Access private 
const getUsers=getAll(User);

//desc get User By Id
// Route Get /api/v1/Users:id
//@Access private

const getUser=getOne(User);

//@desc create User
//@Rout Post /api/v1/Users
//@Access private
const createUser= createOne(User);


//@dec update spicific User
//@Route Put /api/v1/Users/:id
//@Access privet

const updateUser=asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(req.params.id, {
    name : req.body.name,
    email : req.body.email, 
    slug:req.body.slug,
    phone:req.body.phone,
    address:req.body.address, 
    role:req.body.role, 
    status:req.body.status, 
    profileImg:req.body.profileImg,

  }, {
    new: true,
  });

  if (!document) {
    return next(
      new ApiErrors(`No document for this id ${req.params.id}`, 404)
    );
  }
  // Trigger "save" event when update document
  document.save();
  res.status(200).json({ data: document });
});;


//@desc Update userPassword
//@route PUT /api/v1/users/:id/update-password 
//@access Private 

const updateUserPassword=asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(req.params.id, {
    password : await bcrypt.hash(req.body.password, 12),
    passwordChangedAt:Date.now()
  }, {
    new: true,
  });

  if (!document) {
    return next(
      new ApiErrors(`No document for this id ${req.params.id}`, 404)
  )};
    // Trigger "save" event when update document
    document.save();
    res.status(200).json({ data: document });
});

//@desc Delete User
//@Route Delete /api/v1/Users/:id
//@Access private


const deleteUser=deleteOn(User);

export const updatePasswordUserLogged=asyncHandler(async(req,res,next)=>{
  // update user password based user paylod
  const document = await User.findByIdAndUpdate(req.user._id, {
    password : await bcrypt.hash(req.body.password, 12),
    passwordChangedAt:Date.now()
  }, {
    new: true,
  });
    //genreate token 
    const token =createToken(document._id)
    // Trigger "save" event when update document
    document.save();
    res.status(200).json({ data: document ,token:token});
})

export const updateLoggedUserData=asyncHandler(async(req,res,next)=>{
  const updatedUser=await User.findOneAndUpdate(req.user._id,{
    name:req.body.name,
    email: req.body.email,// disable update email after
    phone:req.body.phone
  },{
    new:true
  })
  res.status(200).json({data:updatedUser});
})

export const desactiveLoggedUser=asyncHandler(async(req,res,next)=>{
  await User.findOneAndUpdate(req.user._id,{active:false});
  sendEmail(req.user.email,"desactivation de votre compte");
  res.status(200).json("success");
})


export {getUsers,createUser, getUser, updateUser,deleteUser,updateUserPassword}