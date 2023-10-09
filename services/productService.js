/* eslint-disable import/extensions */
import slugify from "slugify";
import asyncHandler from "express-async-handler";
import { ApiErrors } from "../util/ApiErrors.js";
import productModel from "../modules/productModel.js";
import ApiFeateurs from "../util/apiFeateurs.js";
//@desc get All products
//@Route Get /api/v1/products
//@Access public 
const getproducts=asyncHandler((async(req,res)=>{

  const countDocuments=await productModel.countDocuments();
  const feateurs=new ApiFeateurs(productModel.find(),req.query)
  .paginate(countDocuments)
  .filter()
  .search('Products')
  .fields()
  .sort()
  

  const {mongoosQuery, paginationResult}=feateurs;
  const products=await mongoosQuery;

  res.status(200).json({resultes: products.length,paginationResult,data: products});
}))


//desc get product By Id
// Route Get /api/v1/products:id
//@Access public

const getproduct=asyncHandler((async(req,res,next)=>{
  const {id} =req.params;
  const product=await productModel.findById(id);
  if(!product) return next(new ApiErrors(`no product for this ${id}`,404));
  res.status(200).json({data:{product}});
}))

//@desc create product
//@Rout Post /api/v1/products
//@Access private
const createproduct= asyncHandler((async(req,res)=>{
    req.body.slug=slugify(req.body.title)
    const product=await productModel.create(req.body);
    res.status(201).json({data:product})
  })

)


//@dec update spicific product
//@Route Put /api/v1/products/:id
//@Access privet

const updateproduct=asyncHandler(async(req,res,next)=>{
  const {id}=req.params;
  req.body.slug=slugify(req.body.title)
  const product=await productModel.findByIdAndUpdate({_id:id},req.body,{new:true})
  if(!product) return next(new ApiErrors(`can't update this product ${id}`,404));
  res.status(200).json({data:{product}});
})



//@desc Delete product
//@Route Delete /api/v1/products/:id
//@Access private

const deleteproduct=asyncHandler(async(req,res,next)=>{
  const {id}=req.params;
  const product=await productModel.findOneAndDelete(id);
  if(!product)  return next(new ApiErrors(`can not delete this product ${id}`,404))
  res.status(204).json({msg:"1 item deleted"})
})

export {getproducts,createproduct, getproduct, updateproduct,deleteproduct}