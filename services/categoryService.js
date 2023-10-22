/* eslint-disable import/extensions */
import categoryModel from "../modules/categoryModule.js";
import { createOne, deleteOn, getAll, getOne, updateOne } from "../modules/hundlersFactory.js";
//@desc get All categories
//@Route Get /api/v1/categories
//@Access public 
const getCategories=getAll(categoryModel);


//desc get category By Id
// Route Get /api/v1/categories:id
//@Access public

const getcategory=getOne(categoryModel);

//@desc create category
//@Rout Post /api/v1/categories
//@Access private
const createCategory= createOne(categoryModel);


//@dec update spicific category
//@Route Put /api/v1/categories/:id
//@Access privet

const updateCategory=updateOne(categoryModel);


//@desc Delete category
//@Route Delete /api/v1/categories/:id
//@Access private
const deleteCategory=deleteOn(categoryModel);

export {getCategories,createCategory, getcategory, updateCategory,deleteCategory}