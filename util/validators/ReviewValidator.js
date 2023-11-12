import { body, check } from "express-validator"
import { validatorMiddelWare } from "../../middleware/validatorMiddelware.js"
import {Review} from "../../modules/reviewModule.js";


const getReviewValidator= [
  check('id').isMongoId().withMessage('Invalid id format Review'),
  validatorMiddelWare
]


const createReviewValidator=[
  check('title').optional(),
  check('ratings').notEmpty().withMessage('rating value required')
  .isFloat({min:1,max:5}).withMessage('Rating valus range between 1 to 5'),
  check('user').isMongoId().withMessage('invalid user id format'),
  check('product').isMongoId().withMessage('invalid product id format')
  .custom(async(val,{req})=>{
    const rev=await Review.findOne({user:req.user._id,product:req.body.product})
    if(rev) return Promise.reject(new Error('You already have review'))
  }),
  validatorMiddelWare
]

const updateReviewValidator=[
  check('id').isMongoId().withMessage('Invalid id format Review')
  .custom(async(val,{req})=>{
    const rev =await Review.findById(val);
    if(!rev) return Promise.reject(new Error('there is no review with this id'));
    if(rev.user._id.toString() !== req.user._id.toString()) return Promise.reject(new Error('You are not allowed to preform this action'));
  })
  ,
  validatorMiddelWare 
];


const deleteReviewValidator=[
  check('id').isMongoId().withMessage('Invalid id format Review')
  .custom(async(val,{req})=>{
    if(req.user.role==='user'){
    const rev =await Review.findById(val);
    if(!rev) return Promise.reject(new Error('there is no review with this id'));
    if(rev.user._id.toString() !== req.user._id.toString()) return Promise.reject(new Error('You are not allowed to preform this action'));
    }
    return true;
  })
  ,
  validatorMiddelWare
];





export {getReviewValidator,
        createReviewValidator,
        updateReviewValidator,
        deleteReviewValidator};