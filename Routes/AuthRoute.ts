import express from 'express';
import { LogIn, signUP,forgetPassword, verfiyPassResteCode, ResetPassword } from '../services/AuthService.js';
import { logInValidator, signUpValidator } from '../util/validators/atuthValidator.js';

const AuthRouter=express.Router();




AuthRouter.route('/signUp').post(signUpValidator,signUP);
AuthRouter.route('/login').post(logInValidator,LogIn);
AuthRouter.route('/forgetPassword').post(forgetPassword);
AuthRouter.route('/verfiyPassResteCode').post(verfiyPassResteCode);
AuthRouter.route('/resetPassword').put(ResetPassword);


export default AuthRouter;