import slugify from "slugify";
import { body, check } from "express-validator"
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
  check('email').notEmpty().withMessage('Email is required')
  .isEmail().withMessage('Invalid Email adress')
  .custom((value)=>{
     User.findOne({email: value}).then((userDoc) => {  
      if(userDoc) return Promise.reject(new Error('Email already Exist in dataBase'))
    })
  }),
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
  validatorMiddelWare 
];


const deleteUserValidator=[
  check('id').isMongoId().withMessage('Invalid id format User'),
  validatorMiddelWare
];





export {getUserValidator,
        createUserValidator,
        updateUserValidator,
        deleteUserValidator};