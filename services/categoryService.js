/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import {v4 as uuidv4} from 'uuid';
import sharp from "sharp";
import asyncHandler from "express-async-handler";
import categoryModel from "../modules/categoryModule.js";
import { createOne, deleteOn, getAll, getOne, updateOne } from "../modules/hundlersFactory.js";
import { uploadSingleImage } from '../middleware/uploadImageMiddelware.js';


export const uploadCategoryImage=uploadSingleImage('image');

export const resiezImage=asyncHandler(async(req,res,next)=>{
  const filename=`category-${uuidv4()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer).resize(600,600).toFormat('jpeg').jpeg({quality:90}).toFile(`uploads/categoriesImages/${filename}`);
  req.body.image=filename;
  next();
})


//@desc get All categories
//@Route Get /api/v1/categories
//@Access public 
export const getCategories=getAll(categoryModel);


//desc get category By Id
// Route Get /api/v1/categories:id
//@Access public

export const getcategory=getOne(categoryModel);

//@desc create category
//@Rout Post /api/v1/categories
//@Access private
export const createCategory= createOne(categoryModel);


//@dec update spicific category
//@Route Put /api/v1/categories/:id
//@Access privet

export const updateCategory=updateOne(categoryModel);


//@desc Delete category
//@Route Delete /api/v1/categories/:id
//@Access private
export const deleteCategory=deleteOn(categoryModel);
