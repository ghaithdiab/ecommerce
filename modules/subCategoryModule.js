import mongoose from "mongoose";


const SubCategorySchema=new mongoose.Schema({
  name:{
    type:String,
    trim:true,
    unique:[true, 'subCategory must be unique'],
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



const subCategoryModel=mongoose.model('subCategory',SubCategorySchema);

export {subCategoryModel}