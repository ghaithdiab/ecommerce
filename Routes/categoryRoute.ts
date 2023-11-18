/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import { getCategories,createCategory, getcategory, updateCategory, deleteCategory, uploadCategoryImage, resiezImage } from '../services/categoryService.js';
import { createCategoryValidator, deleteCategoryValidator, getcategoryValidator, updateCategoryValidator } from '../util/validators/categoriesValidator.js';
import { AllowedTo, protect } from '../services/AuthService.js';

const categoriesRouter=express.Router();


//TODO error while update category without image


categoriesRouter.route('/').get(getCategories)
.post(protect,
AllowedTo("admin","manger"),
uploadCategoryImage,
resiezImage,
createCategoryValidator,
createCategory);
categoriesRouter.route('/:id').get(getcategoryValidator,getcategory)
.put(protect,
  AllowedTo("admin","manger"),
  uploadCategoryImage,
  resiezImage,
  updateCategoryValidator,
  updateCategory)
  .delete(protect,
  AllowedTo("admin")
  ,deleteCategoryValidator,
  deleteCategory);


export default categoriesRouter