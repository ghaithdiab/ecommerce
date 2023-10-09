/* eslint-disable import/extensions */
import slugify from "slugify";
import asyncHandler from "express-async-handler";
import BrandModel from "../modules/BrandsModule.js"
import { ApiErrors } from "../util/ApiErrors.js";
import ApiFeateurs from "../util/apiFeateurs.js";

//@desc get All Brands
//@Route Get /api/v1/Brands
//@Access public 
const getBrands=asyncHandler((async(req,res)=>{

  const countDocuments=await BrandModel.countDocuments();
  const feateurs=new ApiFeateurs(BrandModel.find(),req.query)
  .paginate(countDocuments)
  .filter()
  .search()
  .fields()
  .sort()
  

  const {mongoosQuery, paginationResult}=feateurs;

  const Brands=await mongoosQuery;
  res.status(200).json({resultes: Brands.length,paginationResult,data: Brands});
}))


//desc get Brand By Id
// Route Get /api/v1/Brands:id
//@Access public

const getBrand=asyncHandler((async(req,res,next)=>{
  const {id} =req.params;
  const Brand=await BrandModel.findById(id);
  if(!Brand) return next(new ApiErrors(`no Brand for this ${id}`,404));
  res.status(200).json({data:{Brand}});
}))

//@desc create Brand
//@Rout Post /api/v1/Brands
//@Access private
const createBrand= asyncHandler((async(req,res)=>{
    const {name} = req.body
    const Brand=await BrandModel.create({name,slug:slugify(name)})
    res.status(201).json({data:Brand})
  })

)


//@dec update spicific Brand
//@Route Put /api/v1/Brands/:id
//@Access privet

const updateBrand=asyncHandler(async(req,res,next)=>{
  const {id}=req.params;
  const {name}=req.body;
  const Brand=await BrandModel.findByIdAndUpdate({_id:id},{name,slug:slugify(name)},{new:true})
  if(!Brand) return next(new ApiErrors(`can't update this Brand ${id}`,404));
  res.status(200).json({data:{Brand}});
})



//@desc Delete Brand
//@Route Delete /api/v1/Brands/:id
//@Access private

const deleteBrand=asyncHandler(async(req,res,next)=>{
  const {id}=req.params;
  const Brand=await BrandModel.findOneAndDelete(id);
  if(!Brand)  return next(new ApiErrors(`can not delete this Brand ${id}`,404))
  res.status(204).json({msg:"1 item deleted"})
})

export {getBrands,createBrand, getBrand, updateBrand,deleteBrand}