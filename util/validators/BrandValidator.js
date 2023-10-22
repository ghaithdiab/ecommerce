import slugify from "slugify";
import { body, check } from "express-validator"
import { validatorMiddelWare } from "../../middleware/validatorMiddelware.js"



const getBrandValidator= [
  check('id').isMongoId().withMessage('Invalid id format Brand'),
  validatorMiddelWare
]


const createBrandValidator=[

  check('name').notEmpty().withMessage('Brand Required').
  isLength({min:3}).withMessage('Too Short name').
  isLength({max:32}).withMessage('Too Long name')
  .custom((val,{req})=>{
    req.body.slug=slugify(val)
    return true
  }),
  validatorMiddelWare
]

const updateBrandValidator=[
  check('id').isMongoId().withMessage('Invalid id format Brand'),
  body('name').custom((val,{req})=>{
    req.body.slug=slugify(val)
    return true
  }),
  validatorMiddelWare 
];


const deleteBrandValidator=[
  check('id').isMongoId().withMessage('Invalid id format Brand'),
  validatorMiddelWare
];





export {getBrandValidator,
        createBrandValidator,
        updateBrandValidator,
        deleteBrandValidator};