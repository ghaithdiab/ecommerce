import mongoose from "mongoose";

const categorySchema=new mongoose.Schema({
  name:{
    type:String,
    require:[true, 'Category Required'],
    unique:[true,'Category must be unique'],
    minlength:[3,'Too Short name']
  },
  slug:{
    type:String,
    lowercase:true
  },
  image:{
    
  }
},{timestamps:true})

const categoryModel=mongoose.model('category',categorySchema);


export default categoryModel