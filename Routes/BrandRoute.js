import express from 'express';
import { createBrand, deleteBrand, getBrand, getBrands, updateBrand } from '../services/BrandService.js';
import { createBrandValidator, deleteBrandValidator, getBrandValidator, updateBrandValidator } from '../util/validators/BrandValidator.js';
import {protect,AllowedTo} from '../services/AuthService.js'

const BrandRouter=express.Router();






BrandRouter.route('/').get(getBrands)
.post(protect,
  AllowedTo("admin","manger"),
  createBrandValidator,
  createBrand);
BrandRouter.route('/:id').get(getBrandValidator,getBrand)
.put(protect,
  AllowedTo("admin","manger"),
  updateBrandValidator,
  updateBrand)
  .delete(protect,
    AllowedTo("admin"),
    deleteBrandValidator,
    deleteBrand);


export default BrandRouter