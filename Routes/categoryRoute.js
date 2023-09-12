import express from 'express';
import { getCategories,createCategory, getcategory, updateCategory, deleteCategory } from '../services/categoryService.js';
import { createCategoryValidator, deleteCategoryValidator, getcategoryValidator, updateCategoryValidator } from '../util/validators/categoriesValidator.js';

const categoriesRouter=express.Router();






categoriesRouter.route('/').get(getCategories).post(createCategoryValidator,createCategory);
categoriesRouter.route('/:id').get(getcategoryValidator,getcategory)
.put(updateCategoryValidator,updateCategory).delete(deleteCategoryValidator,deleteCategory);


export default categoriesRouter