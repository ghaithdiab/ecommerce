import { check } from "express-validator";
import { validatorMiddelWare } from "../../middleware/validatorMiddelware.js";
import productModel from '../../models/productModel.js';

export const addproductTowishListValidator=[
  check('productId').notEmpty().isMongoId().withMessage('invalid id product')
  .custom(async(val,{req})=>{
    const product= await productModel.findById(req.body.productId);
    if(!product) throw new Error("Product not found");
      return true;
  }),
  validatorMiddelWare
]

export const RemoveproductFromwishListValidator=[
  check('id').notEmpty().isMongoId().withMessage('invalid id product')
  .custom(async(val,{req})=>{
    const product= await productModel.findById(req.params.id);
    if(!product) throw new Error("Product not found");
      return true;
  }),
  validatorMiddelWare
]