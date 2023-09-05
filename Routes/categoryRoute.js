import express from 'express';
import { getCategories,createCategory, getcategory, updateCategory, deleteCategory } from '../services/categoryService.js';

const router=express.Router();



router.route('/').get(getCategories).post(createCategory);
router.route('/:id').get(getcategory).put(updateCategory).delete(deleteCategory);
export default router