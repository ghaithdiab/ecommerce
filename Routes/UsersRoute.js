import express from 'express';
import { createUser, deleteUser, getUser, getUsers, updateUser, updateUserPassword } from '../services/UserService.js';
import { createUserValidator, deleteUserValidator, getUserValidator, updatePasswordValidator, updateUserValidator } from '../util/validators/UserValidator.js';
import {protect,AllowedTo} from'../services/AuthService.js';

const UserRouter=express.Router();




UserRouter.route('/updatePassword/:id').put(updatePasswordValidator,updateUserPassword);

UserRouter.route('/').get(protect,
  AllowedTo("admin"),getUsers)
  .post(protect,
    AllowedTo("admin"),
    createUserValidator,
    createUser);
UserRouter.route('/:id').get(protect,AllowedTo("admin"),getUserValidator,getUser)
.put(protect,
  AllowedTo("admin"),
  updateUserValidator,
  updateUser)
.delete(protect,
  AllowedTo("admin"),
  deleteUserValidator,
  deleteUser);


export default UserRouter