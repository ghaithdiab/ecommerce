import express from 'express';
import { createUser, deleteUser, desactiveLoggedUser, getUser, getUsers, updateLoggedUserData, updatePasswordUserLogged, updateUser, updateUserPassword } from '../services/UserService.js';
import { createUserValidator, deleteUserValidator, getUserValidator, updatePasswordValidator, updateUserValidator } from '../util/validators/UserValidator.js';
import {protect,AllowedTo, getLoggedUserData} from'../services/AuthService.js';

const UserRouter=express.Router();




UserRouter.route('/updatePassword/:id').put(updatePasswordValidator,updateUserPassword);
UserRouter.route('/getLoggedUserData').get(protect,getLoggedUserData,getUser);
UserRouter.route('/updatepasswordUserLogged').put(protect,updatePasswordValidator,updatePasswordUserLogged);
UserRouter.route('/updateLoggedUserData').put(protect,updateUserValidator,updateLoggedUserData);
UserRouter.route('/desactiveLoggedUser').put(protect,desactiveLoggedUser);

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