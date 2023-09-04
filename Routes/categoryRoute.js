import express from 'express';
import { getCategories,createCategory } from '../services/categoryService.js';

const router=express.Router();


router.route('/').get(getCategories).post(createCategory);


export default router