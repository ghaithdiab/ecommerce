import mongoose from "mongoose";

const Brands=new mongoose.Schema({
  name:{
    type:String,
    require:[true, 'Brand Required'],
    unique:[true,'Brand must be unique'],
    minlength:[3,'Too Short name'],
    maxlength:[32,'Too long name']
  },
  slug:{
    type:String,
    lowercase:true
  },
  image:String
},{timestamps:true})

const BrandModel=mongoose.model('Brand',Brands);


export default BrandModel