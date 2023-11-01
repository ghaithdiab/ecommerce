import slugify from "slugify";
import { body, check } from "express-validator"
// eslint-disable-next-line import/no-extraneous-dependencies
import bcrypt from 'bcryptjs';
import { validatorMiddelWare } from "../../middleware/validatorMiddelware.js"
import User from "../../modules/UserModule.js";


const createUserValidator=[
  
  check('name').notEmpty().withMessage('User Required').
  isLength({min:3}).withMessage('Too Short name')
  .custom((val,{req})=>{
    req.body.slug=slugify(val)
    return true
  }),
  //check if email already exist in the database  
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
    if(password !== req.body.confirmpassword) throw new Error('Passowrd conformation incorrect');
    return true
  }),
  //confirm password validation 
  check('confirmpassword').notEmpty().withMessage('password confirme required'),
  check('profilImg').optional(),
  check('role').optional(),
  check('phone').optional().isMobilePhone(['fr-FR']).withMessage('phone number must be jsut from france'),  
  validatorMiddelWare
]

const getUserValidator= [
  check('id').isMongoId().withMessage('Invalid id format User'),
  validatorMiddelWare
]
const updateUserValidator=[
  check('id').isMongoId().withMessage('Invalid id format User'),
  body('name').custom((val,{req})=>{
    req.body.slug=slugify(val)
    return true
  }),
  check('role').optional(),
  check('phone').optional().isMobilePhone(['fr-FR']).withMessage('phone number must be jsut from france'),
    //check if email already exist in the database  
    check('email').notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid Email adress')
    .custom((value)=>{
       User.findOne({email: value}).then((userDoc) => {  
        if(userDoc) return Promise.reject(new Error('Email already Exist in dataBase'))
      })
    }),
  validatorMiddelWare 
];

const updatePasswordValidator=[
  check('id').isMongoId().withMessage('Invalid id format User'),
  check('currentPassword').notEmpty().withMessage('Current Password is required'), 
  check('confirmNewPassword').notEmpty().withMessage('Confirm New Password is required'),
  check('password').notEmpty().withMessage('New Password is required')
  .custom(async(val,{req})=>{
    // 1) verify currentPassword
    const user = await User.findById(req.params.id);
    if(!user) throw new Error('No such user found');
    const isCorrrectPassword= await  bcrypt.compare(req.body.currentPassword,user.password);
    if (!isCorrrectPassword )throw new Error('Incorrect Current Password ');  
    // 2) verify password Confirm
    if (val !==req.body.confirmNewPassword) throw new Error('Password and confirm password not match');  
  }),
  validatorMiddelWare
]
const deleteUserValidator=[
  check('id').isMongoId().withMessage('Invalid id format User'),
  validatorMiddelWare
];





export {getUserValidator,
        createUserValidator,
        updateUserValidator,
        updatePasswordValidator,
        deleteUserValidator};