import { check } from "express-validator"
import { validatorMiddelWare } from "../../middleware/validatorMiddelware.js"



const getBrandValidator= [
  check('id').isMongoId().withMessage('Invalid id format Brand'),
  validatorMiddelWare
]


const createBrandValidator=[

  check('name').notEmpty().withMessage('Brand Required').
  isLength({min:3}).withMessage('Too Short name').
  isLength({max:32}).withMessage('Too Long name'),
  validatorMiddelWare
]

const updateBrandValidator=[
  check('id').isMongoId().withMessage('Invalid id format Brand'),
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