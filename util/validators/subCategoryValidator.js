import slugify from "slugify"
import { check,body } from "express-validator"
import { validatorMiddelWare } from "../../middleware/validatorMiddelware.js"



const getsubCategoryValidator= [
  check('id').isMongoId().withMessage('Invalid id format subCategory'),
  validatorMiddelWare
]


const createsubCategoryValidator=[

  check('name').notEmpty().withMessage('subCategory Required').
  isLength({min:3}).withMessage('Too Short name').
  isLength({max:32}).withMessage('Too Long name'),
  check('category').notEmpty().withMessage('category is Empty')
  .isMongoId().withMessage('Invalid id format Category'),
  body('name').optional().custom((val,{req})=>{
    req.body.slug=slugify(val)
    return true
  }),
  validatorMiddelWare
]

const updatesubCategoryValidator=[
  check('id').isMongoId().withMessage('Invalid id format subCategory')
  .custom((val,{req})=>{
    req.body.slug=slugify(val)
    return true
  }),
  validatorMiddelWare
];


const deletesubCategoryValidator=[
  check('id').isMongoId().withMessage('Invalid id format subCategory'),
  validatorMiddelWare
];





export {getsubCategoryValidator,
        createsubCategoryValidator,
        updatesubCategoryValidator,
        deletesubCategoryValidator};