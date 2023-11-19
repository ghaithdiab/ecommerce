import { CustomRequest, CustomResponse, ResiezImageRequest, asyncHandler } from '../types.js';
import {v4 as uuidv4} from 'uuid';
import sharp, { SharpOptions } from "sharp";
import { createOne, deleteOn, getAll, getOne, updateOne } from "../models/hundlersFactory.js";
import { uploadSingleImage } from "../middleware/uploadImageMiddelware.js";
import { BrandModel } from "../models/BrandsModel.js";
import { NextFunction } from 'express';

export const uploadBrandImage=uploadSingleImage('image');

export const resiezImage=asyncHandler<sharp.SharpOptions>(async(req:CustomRequest<SharpOptions>,res:CustomResponse,next:NextFunction)=>{
  const filename=`Brand-${uuidv4()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer).resize(600,600).toFormat('jpeg').jpeg({quality:90}).toFile(`uploads/BrandsImages/${filename}`);
  req.body.image=filename;
  next();
})



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