import slugify from "slugify";
import { check } from "express-validator"
// eslint-disable-next-line import/no-extraneous-dependencies
import { validatorMiddelWare } from "../../middleware/validatorMiddelware.js"
import User from "../../modules/UserModule.js";


export const signUpValidator=[
  
  check('name').notEmpty().withMessage('User Required').
  isLength({min:3}).withMessage('Too Short name')
  .custom((val,{req})=>{
    req.body.slug=slugify(val)
    return true
  }),

  check('email')
  .notEmpty()
  .withMessage('Email required')
  .isEmail()
  .withMessage('Invalid email address')
  .custom((val) =>
    User.findOne({ email: val }).then((user) => {
      if (user) {
        return Promise.reject(new Error('E-mail already in user'));
      }
    })
  ),
  //password validation 
  check('password').notEmpty().withMessage('Password is required')
  .isLength({ min:8 }).withMessage("Passord should be at least 8 character long")
  .custom((password,{req})=>{
    if(password !== req.body.confirmPassword) throw new Error('Passowrd conformation incorrect');
    return true
  }),
  //confirm password validation 
  check('confirmPassword').notEmpty().withMessage('password confirme required'),
  validatorMiddelWare
]



export const logInValidator=[

  check('email')
  .notEmpty()
  .withMessage('Email required')
  .isEmail()
  .withMessage('Invalid email address'),
  //password validation 
  check('password').notEmpty().withMessage('Password is required')
  .isLength({ min:8 }).withMessage("Passord should be at least 8 character long"),
  validatorMiddelWare
]


