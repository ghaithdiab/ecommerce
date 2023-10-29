/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from 'bcryptjs';
import asyncHandler from "express-async-handler";
import { ApiErrors } from "../util/ApiErrors.js";
import User from "../modules/UserModule.js";
import { createOne, deleteOn, getAll, getOne } from "../modules/hundlersFactory.js";
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

export {getUsers,createUser, getUser, updateUser,deleteUser,updateUserPassword}