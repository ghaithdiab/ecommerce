/* eslint-disable import/extensions */
import BrandModel from "../modules/BrandsModule.js"
import { createOne, deleteOn, getAll, getOne, updateOne } from "../modules/hundlersFactory.js";

//@desc get All Brands
//@Route Get /api/v1/Brands
//@Access public 
const getBrands=getAll(BrandModel);

//desc get Brand By Id
// Route Get /api/v1/Brands:id
//@Access public

const getBrand=getOne(BrandModel);

//@desc create Brand
//@Rout Post /api/v1/Brands
//@Access private
const createBrand= createOne(BrandModel);


//@dec update spicific Brand
//@Route Put /api/v1/Brands/:id
//@Access privet

const updateBrand=updateOne(BrandModel);

//@desc Delete Brand
//@Route Delete /api/v1/Brands/:id
//@Access private


const deleteBrand=deleteOn(BrandModel);

export {getBrands,createBrand, getBrand, updateBrand,deleteBrand}