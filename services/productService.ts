/* eslint-disable import/extensions */
import asyncHandler from "express-async-handler";
import {v4 as uuidv4} from 'uuid';
import sharp from "sharp";
import productModel from "../models/productModel.js";
import { createOne, deleteOn, getAll, getOne, updateOne } from "../models/hundlersFactory.js";
import { uploadMultipImage } from "../middleware/uploadImageMiddelware.js";


//TODO there is problem with upload multip images
export const uploadProductImage=uploadMultipImage(
  [
    {
    name:"imageCover",
    maxCount:1
    },
    {
    name:"images",
    maxCount:5
    }
  ]
)

export const resiezProductImage=asyncHandler(async(req,res,next)=>{

  if(req.files.imageCover){
    const imageCoverFilename=`product-${uuidv4()}-${Date.now()}-cover.jpeg`;

    await sharp(req.files.imageCover[0].buffer).resize(2000,1333).toFormat('jpeg').jpeg({quality:90}).toFile(`uploads/productImages/${imageCoverFilename}`);
    req.body.imageCover=imageCoverFilename;
  }

  if(req.files.images){
    req.body.images=[];
    await Promise.all(
      req.files.images.map(async(img,index)=>{
        const filename=`product-${uuidv4()}-${Date.now()}${index+1}.jpeg`;
        await sharp(img.buffer).resize(200,200).toFormat('jpeg').jpeg({quality:90}).toFile(`uploads/productImages/${filename}`);
        req.body.images.push(filename);
      })
    )
  }
  next();
})







//@desc get All products
//@Route Get /api/v1/products
//@Access public 
const getproducts=getAll(productModel,'Products');

//desc get product By Id
// Route Get /api/v1/products:id
//@Access public

const getproduct=getOne(productModel,'reviews');
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