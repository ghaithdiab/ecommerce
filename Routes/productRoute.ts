import express from 'express';
import { createproduct, deleteproduct, getproduct, getproducts, updateproduct,resiezProductImage, uploadProductImage } from '../services/productService.js';
import { createProductValidator, deleteProductValidators, getProductValidators, updateProductValidators } from '../util/validators/productsValidator.js';
import{protect,AllowedTo} from'../services/AuthService.js'

const productRouter=express.Router();






productRouter.route('/').get(getproducts)
.post(protect,
  AllowedTo("admin","manger"),
  uploadProductImage,
  resiezProductImage,
  createProductValidator,
  createproduct);
productRouter.route('/:id').get(getProductValidators,getproduct)
.put(protect,
  AllowedTo("admin","manger"),
  uploadProductImage,
  resiezProductImage,
  updateProductValidators,
  updateproduct)
  .delete(protect,
    AllowedTo("admin"),
    deleteProductValidators,
    deleteproduct);


export default productRouter