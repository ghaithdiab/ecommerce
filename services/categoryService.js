import categoryModel from "../modules/categoryModule.js";
import slugify from "slugify";
import asyncHandler from "express-async-handler"

//@desc get All categories
//@Route Get /api/v1/categories
//@Access public 
const getCategories=asyncHandler((async(req,res)=>{
  const page=req.query.page *1 ||1;
  const limit=req.query.limit *1 ||5;
  const skip=(page-1) * limit; 
  const categories=await categoryModel.find({}).skip(skip);
  res.status(200).json({resultes: categories.length,page,data: categories});
}))


//desc get category By Id
// Route Get /api/v1/categories:id
//@Access public

const getcategory=asyncHandler((async(req,res)=>{
  const {id} =req.params;
  const category=await categoryModel.findById(id);
  if(!category) res.status(404).json({msg:'no category for this ' + id +''});
  res.status(200).json({data:{category}});
}))

//@desc create category
//@Rout Post /api/v1/categories
//@Access private
const createCategory= asyncHandler((async(req,res)=>{
    const name=req.body.name
    const category=await categoryModel.create({name,slug:slugify(name)})
    res.status(201).json({data:category})
  })

)


//@dec update spicific category
//@Route Put /api/v1/categories/:id
//@Access privet

const updateCategory=asyncHandler(async(req,res)=>{
  const {id}=req.params;
  const {name}=req.body;
  const category=await categoryModel.findByIdAndUpdate({_id:id},{name,slug:slugify(name)},{new:true})
  if(!category) res.status(404).json({msg:'can not update this category ' + id});
  res.status(200).json({data:{category}});
})



//@desc Delete category
//@Route Delete /api/v1/categories/:id
//@Access private

const deleteCategory=asyncHandler(async(req,res)=>{
  const {id}=req.params;
  const category=await categoryModel.findOneAndDelete(id);
  if(!category) res.status(404).json({msg:'can not delete this category ' + id});
  res.status(204).send();
})

export {getCategories,createCategory, getcategory, updateCategory,deleteCategory}