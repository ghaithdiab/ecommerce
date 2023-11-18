import mongoose from "mongoose";
import { ISubCategory } from "../types";


const SubCategorySchema=new mongoose.Schema<ISubCategory>({
  name:{
    type:String,
    trim:true,
    unique:true,
    minlength:[2,"name subCategory Too short"],
    maxlength:[32,'name subCategory Too longe']
  },
  slug:{
    type:String,
    lowerCase:true
  },
  category:{
    type:mongoose.Schema.ObjectId,
    ref:'category',
    require:[true,"subCategory must belong to category Name"]
  }
},{timestamps:true});



export const subCategoryModel=mongoose.model<ISubCategory & Document>('SubCategory',SubCategorySchema);