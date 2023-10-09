import { check } from "express-validator"
import { validatorMiddelWare } from "../../middleware/validatorMiddelware.js"
import categoryModel from "../../modules/categoryModule.js"
import { subCategoryModel } from "../../modules/subCategoryModule.js"


const createProductValidator=[
  check('title').isLength({min:3}).withMessage('must be at least 3 chars').notEmpty().withMessage('title must be not empty'),
  check('description').notEmpty().withMessage('description required').isLength({max:2000}).withMessage('max length of description 2000 chars'),
  check('quantity').notEmpty().withMessage('product quantity is required').isNumeric().withMessage('product quantity must be a number'),
  check('sold').optional().isNumeric().withMessage('sold must be a number'),
  check('price').notEmpty().withMessage('Product price is required').isNumeric().withMessage('price product must be number').isLength({max:32}).withMessage('price product so big'),
  check('priceAfterDiscount').optional().toFloat().isNumeric().withMessage('price After discount must be a number')
  .custom((value,{req})=>{
    if(req.body.price <= value){
      if(req.body.priceAfterDiscount>req.body.price){
        throw new Error('price after discount must be lower than price')
      }
    }
    return true
  }),
  check('colors').optional().isArray().withMessage(' colors must be array of string'),
  check('imageCover').notEmpty().withMessage('image cover is required'),
  check('images').optional().isArray().withMessage('images must be array of string'),
  check('category').notEmpty().withMessage('product must belong to a category').isMongoId().withMessage('invalide category id formate')
  .custom((categoryId)=>categoryModel.findById(categoryId).then(category=>{
    if(!category) return Promise.reject(new Error(`No category found with this categoryId ${categoryId}`))
  })),
  check('subCategories').optional().isMongoId().withMessage('invalid value')
  .custom((subcategoriesIds) =>
  subCategoryModel.find({ _id: { $exists: true, $in: subcategoriesIds } }).then(
    (result) => {
      if (result.length < 1 || result.length !== subcategoriesIds.length) {
        return Promise.reject(new Error(`Invalid subcategories Ids`));
      }
    })) .custom((val, { req }) =>
    subCategoryModel.find({ category: req.body.category }).then(
      (subcategories) => {
        const subCategoriesIdsInDB = [];
        subcategories.forEach((subCategory) => {
          subCategoriesIdsInDB.push(subCategory._id.toString());
        });
        // check if subcategories ids in db include subcategories in req.body (true)
        const checker = (target, arr) => target.every((v) => arr.includes(v));
        if (!checker(val, subCategoriesIdsInDB)) {
          return Promise.reject(new Error(`subcategories not belong to category`));
        }
      })),
  check('brand').optional().isMongoId().withMessage('invalide brand id format'),
  check('ratingAverage').optional().isNumeric().withMessage('rating Average must be number').isLength({min:1}).withMessage('Rating Average must be above from 1').isLength({max:5}).withMessage('Rating Average must be less or equal to 5'),
  check('ratingQuantity').optional().isNumeric().withMessage('rating quantity must be a number'),
  validatorMiddelWare
]

const getProductValidators=[
  check('id').isMongoId().withMessage('invalide product id format'),
  validatorMiddelWare
]

const updateProductValidators=[
  check('id').isMongoId().withMessage('invalide product id format'),
  validatorMiddelWare
]
const deleteProductValidators=[
  check('id').isMongoId().withMessage('invalide product id format'),
  validatorMiddelWare
]


export{createProductValidator,getProductValidators,updateProductValidators,deleteProductValidators}

