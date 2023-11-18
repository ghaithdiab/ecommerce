import express from 'express';
import { createFilterObject, createSubCategory, deletesubCategory, getsubCategories, getsubCategory, setCategoryId, updatesubCategory } from '../services/subCategoryService.js';
import { createsubCategoryValidator, deletesubCategoryValidator, getsubCategoryValidator, updatesubCategoryValidator } from '../util/validators/subCategoryValidator.js';
import {protect,AllowedTo} from'../services/AuthService.js';


// mergeParames Allow us ti access to paramter in another router
const subCategoryRouter=express.Router({mergeParams:true});


subCategoryRouter.route('/')
.post(protect,
  AllowedTo("admin","manger"),
  setCategoryId,
  createsubCategoryValidator,
  createSubCategory).get(getsubCategories)
subCategoryRouter.route('/:id').get(createFilterObject,getsubCategoryValidator,getsubCategory)
.put(protect,
  AllowedTo("admin","manger"),
  updatesubCategoryValidator,
  updatesubCategory)
.delete(protect,
  AllowedTo("admin"),
  deletesubCategoryValidator,
  deletesubCategory)



export  default subCategoryRouter