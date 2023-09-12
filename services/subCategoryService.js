
/* eslint-disable import/extensions */
import slugify from "slugify";
import asyncHandler from "express-async-handler";
import { subCategoryModel } from "../modules/subCategoryModule.js";
import { ApiErrors } from "../util/ApiErrors.js";


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
const getsubCategories=asyncHandler((async(req,res)=>{
  const page=req.query.page *1 ||1;
  const limit=req.query.limit *1 ||5;
  const skip=(page-1) * limit; 
  const subCategory=await subCategoryModel.find(req.filterObject).skip(skip).populate({path:'category',select:'name'});
  res.status(200).json({resultes: subCategory.length,page,data: subCategory});
}))


//desc get category By Id
// Route Get /api/v1/categories:id
//@Access public

const getsubCategory=asyncHandler((async(req,res,next)=>{
  const {id} =req.params;
  const subCategory=await subCategoryModel.findById(id).populate({path:'category',select:'name -_id'});
  if(!subCategory) return next(new ApiErrors(`no subCategory for this ${id}`,404));
  res.status(200).json({data:{subCategory}});
}))


export const setCategoryId=(req,res,next)=>{
  if(!req.body.category) req.body.category=req.params.categoryId;
  next();
}
//@desc create subCategory
//@Rout Post /api/v1/subCategory
//@Access private
const createSubCategory= asyncHandler((async(req,res)=>{
  
  const {name, category} = req.body
  const subcategory=await subCategoryModel.create({name,slug:slugify(name),category:category})
  res.status(201).json({data:subcategory})
}))

//@dec update spicific subcategory
//@Route Put /api/v1/categories/:id
//@Access privet

const updatesubCategory=asyncHandler(async(req,res,next)=>{
  const {id}=req.params;
  const {name}=req.body;
  const subCategory=await subCategoryModel.findByIdAndUpdate({_id:id},{name,slug:slugify(name)},{new:true})
  if(!subCategory) return next(new ApiErrors(`can't update this subCategory ${id}`,404));
  res.status(200).json({data:{subCategory}});
})



//@desc Delete subCategory
//@Route Delete /api/v1/categories/:id
//@Access private

const deletesubCategory=asyncHandler(async(req,res,next)=>{
  const {id}=req.params;
  const subCategory=await subCategoryModel.findOneAndDelete(id);
  if(!subCategory)  return next(new ApiErrors(`can not delete this subCategory ${id}`,404))
  res.status(204).json({msg:"1 item deleted"})
})



export {createSubCategory,getsubCategories,getsubCategory,updatesubCategory,deletesubCategory};
