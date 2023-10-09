import express from 'express';
import { createproduct, deleteproduct, getproduct, getproducts, updateproduct } from '../services/productService.js';
import { createProductValidator, deleteProductValidators, getProductValidators, updateProductValidators } from '../util/validators/productsValidator.js';

const productRouter=express.Router();






productRouter.route('/').get(getproducts).post(createProductValidator,createproduct);
productRouter.route('/:id').get(getProductValidators,getproduct)
.put(updateProductValidators,updateproduct).delete(deleteProductValidators,deleteproduct);


export default productRouter