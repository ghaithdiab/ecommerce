/* eslint-disable import/extensions */
import User from "../modules/UserModule.js";
import { createOne, deleteOn, getAll, getOne, updateOne } from "../modules/hundlersFactory.js";

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

const updateUser=updateOne(User);

//@desc Delete User
//@Route Delete /api/v1/Users/:id
//@Access private


const deleteUser=deleteOn(User);

export {getUsers,createUser, getUser, updateUser,deleteUser}