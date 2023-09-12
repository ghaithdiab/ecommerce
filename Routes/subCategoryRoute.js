import express from 'express';
import { createFilterObject, createSubCategory, deletesubCategory, getsubCategories, getsubCategory, setCategoryId, updatesubCategory } from '../services/subCategoryService.js';
import { createsubCategoryValidator, deletesubCategoryValidator, getsubCategoryValidator, updatesubCategoryValidator } from '../util/validators/subCategoryValidator.js';



// mergeParames Allow us ti access to paramter in another router
const subCategoryRouter=express.Router({mergeParams:true});


subCategoryRouter.route('/').post(setCategoryId,createsubCategoryValidator,createSubCategory).get(getsubCategories)
subCategoryRouter.route('/:id').get(createFilterObject,getsubCategoryValidator,getsubCategory)
.put(updatesubCategoryValidator,updatesubCategory)
.delete(deletesubCategoryValidator,deletesubCategory)



export  default subCategoryRouter