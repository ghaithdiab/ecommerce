
/* eslint-disable import/extensions */
import { subCategoryModel } from "../models/SubCategoryModel.js";
import { createOne, deleteOn, getAll, getOne, updateOne } from "../models/hundlersFactory.js";


//Nested Route
//@desc get All sub category for spicific category
//@Route get /api/v1/categories/:categoryID/subCategoties

export const createFilterObject=(req,res,next)=>{
  let filterObject={};
  if(req.params.categoryId) filterObject={category: req.params.categoryId}
  req.filterObject=filterObject;
  next();
}

//@desc get All categories
//@Route Get /api/v1/categories
//@Access public 
const getsubCategories=getAll(subCategoryModel);


//desc get category By Id
// Route Get /api/v1/categories:id
//@Access public

const getsubCategory=getOne(subCategoryModel);


export const setCategoryId=(req,res,next)=>{
  if(!req.body.category) req.body.category=req.params.categoryId;
  next();
}
//@desc create subCategory
//@Rout Post /api/v1/subCategory
//@Access private
const createSubCategory= createOne(subCategoryModel);

//@dec update spicific subcategory
//@Route Put /api/v1/categories/:id
//@Access privet

const updatesubCategory=updateOne(subCategoryModel);

//@desc Delete subCategory
//@Route Delete /api/v1/categories/:id
//@Access private

const deletesubCategory=deleteOn(subCategoryModel);


export {createSubCategory,getsubCategories,getsubCategory,updatesubCategory,deletesubCategory};
