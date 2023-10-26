import express from 'express';
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../services/UserService.js';
import { createUserValidator, deleteUserValidator, getUserValidator, updateUserValidator } from '../util/validators/UserValidator.js';

const UserRouter=express.Router();






UserRouter.route('/').get(getUsers).post(createUserValidator,createUser);
UserRouter.route('/:id').get(getUserValidator,getUser)
.put(updateUserValidator,updateUser).delete(deleteUserValidator,deleteUser);


export default UserRouter