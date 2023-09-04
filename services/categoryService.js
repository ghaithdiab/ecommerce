import categoryModel from "../modules/categoryModule.js";
import slugify from "slugify";

const getCategories=((req,res)=>{
    
  })

const createCategory=((req,res)=>{
    const name=req.body.name
    categoryModel.create({name,slug:slugify(name)}).then((category)=>res.status(201).json({data:category}))
    .catch((err)=>{res.status(400).send(err)})
  })


export {getCategories,createCategory}