/* eslint-disable import/extensions */

import productModel from "../modules/productModel.js";
import { createOne, deleteOn, getAll, getOne, updateOne } from "../modules/hundlersFactory.js";

//@desc get All products
//@Route Get /api/v1/products
//@Access public 
const getproducts=getAll(productModel,'Products');

//desc get product By Id
// Route Get /api/v1/products:id
//@Access public

const getproduct=getOne(productModel);
//@desc create product
//@Rout Post /api/v1/products
//@Access private
const createproduct=createOne(productModel);


//@dec update spicific product
//@Route Put /api/v1/products/:id
//@Access privet

const  updateproduct=updateOne(productModel);

//@desc Delete product
//@Route Delete /api/v1/products/:id
//@Access private
const deleteproduct=deleteOn(productModel)

export {getproducts,createproduct, getproduct, updateproduct,deleteproduct}