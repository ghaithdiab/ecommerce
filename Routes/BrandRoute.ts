import express from 'express';
import { createBrand, deleteBrand, getBrand, getBrands, resiezImage, updateBrand, uploadBrandImage } from '../services/BrandService.js';
import { createBrandValidator, deleteBrandValidator, getBrandValidator, updateBrandValidator } from '../util/validators/BrandValidator.js';
import {protect,AllowedTo} from '../services/AuthService.js'

const BrandRouter=express.Router();


//TODO error while update brand without image 



BrandRouter.route('/').get(getBrands)
.post(protect,
  AllowedTo("admin","manger"),
  uploadBrandImage,
  resiezImage,
  createBrandValidator,
  createBrand);
BrandRouter.route('/:id').get(getBrandValidator,getBrand)
.put(protect,
  AllowedTo("admin","manger"),
  uploadBrandImage,
  resiezImage,
  updateBrandValidator,
  updateBrand)
  .delete(protect,
    AllowedTo("admin"),
    deleteBrandValidator,
    deleteBrand);


export default BrandRouter