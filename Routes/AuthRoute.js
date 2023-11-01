import express from 'express';
import { LogIn, signUP } from '../services/AuthService.js';
import { logInValidator, signUpValidator } from '../util/validators/atuthValidator.js';

const AuthRouter=express.Router();




AuthRouter.route('/signUp').post(signUpValidator,signUP);
AuthRouter.route('/login').post(logInValidator,LogIn);


export default AuthRouter;