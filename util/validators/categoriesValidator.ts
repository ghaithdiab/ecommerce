import slugify from "slugify";
import { check ,body} from "express-validator";
import { validatorMiddelWare } from "../../middleware/validatorMiddelware.js";



const getcategoryValidator= [
  check('id').isMongoId().withMessage('Invalid id format category'),
  validatorMiddelWare
]


const createCategoryValidator=[

  check('name').notEmpty().withMessage('Category Required').
  isLength({min:3}).withMessage('Too Short name').
  isLength({max:32}).withMessage('Too Long name')
  .custom((val,{req})=>{
    req.body.slug=slugify(val)
    return true
  }),
  validatorMiddelWare
]

const updateCategoryValidator=[
  check('id').isMongoId().withMessage('Invalid id format category'),
  body('name').custom((val,{req})=>{
    req.body.slug=slugify(val)
    return true
  }),
  validatorMiddelWare
];


const deleteCategoryValidator=[
  check('id').isMongoId().withMessage('Invalid id format category'),
  validatorMiddelWare
];





export {getcategoryValidator,
        createCategoryValidator,
        updateCategoryValidator,
        deleteCategoryValidator};