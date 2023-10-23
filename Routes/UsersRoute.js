import express from 'express';
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../services/UserService.js';

const UserRouter=express.Router();






UserRouter.route('/').get(getUsers).post(createUser);
UserRouter.route('/:id').get(getUser)
.put(updateUser).delete(deleteUser);


export default UserRouter