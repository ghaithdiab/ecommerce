import { check } from "express-validator"
import { validatorMiddelWare } from "../../middleware/validatorMiddelware.js"



const getcategoryValidator= [
  check('id').isMongoId().withMessage('Invalid id format category'),
  validatorMiddelWare
]


const createCategoryValidator=[

  check('name').notEmpty().withMessage('Category Required').
  isLength({min:3}).withMessage('Too Short name').
  isLength({max:32}).withMessage('Too Long name'),
  validatorMiddelWare
]

const updateCategoryValidator=[
  check('id').isMongoId().withMessage('Invalid id format category'),
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