import express from 'express';
import { createBrand, deleteBrand, getBrand, getBrands, updateBrand } from '../services/BrandService.js';
import { createBrandValidator, deleteBrandValidator, getBrandValidator, updateBrandValidator } from '../util/validators/BrandValidator.js';

const BrandRouter=express.Router();






BrandRouter.route('/').get(getBrands).post(createBrandValidator,createBrand);
BrandRouter.route('/:id').get(getBrandValidator,getBrand)
.put(updateBrandValidator,updateBrand).delete(deleteBrandValidator,deleteBrand);


export default BrandRouter