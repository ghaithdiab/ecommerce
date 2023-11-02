import express from 'express';
import { getCategories,createCategory, getcategory, updateCategory, deleteCategory } from '../services/categoryService.js';
import { createCategoryValidator, deleteCategoryValidator, getcategoryValidator, updateCategoryValidator } from '../util/validators/categoriesValidator.js';
import { AllowedTo, protect } from '../services/AuthService.js';

const categoriesRouter=express.Router();






categoriesRouter.route('/').get(getCategories)
.post(protect,
AllowedTo("admin","manger"),
createCategoryValidator,
createCategory);
categoriesRouter.route('/:id').get(getcategoryValidator,getcategory)
.put(protect,
  AllowedTo("admin","manger"),
  updateCategoryValidator,
  updateCategory)
  .delete(protect,
  AllowedTo("admin")
  ,deleteCategoryValidator,
  deleteCategory);


export default categoriesRouter