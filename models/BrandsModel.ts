import mongoose from "mongoose";
import { IBrands } from "../types";


const BrandsSchema=new mongoose.Schema<IBrands>({
  name:{
    type:String,
    require:[true, 'Brand Required'],
    unique:true,
    minlength:[3,'Too Short name'],
    maxlength:[32,'Too long name']
  },
  slug:{
    type:String,
    lowercase:true
  },
  image:String
},{timestamps:true})

const setImageURL=(doc:IBrands)=>{
  if(doc.image){
    const imgeURL=`${process.env.BASE_URL}/brandsImages/${doc.image}`;
    doc.image=imgeURL;
  }
}

BrandsSchema.post('init',(doc:IBrands)=> setImageURL(doc));
BrandsSchema.post('save',(doc:IBrands)=> setImageURL(doc));

export const BrandModel=mongoose.model<IBrands & Document>('Brand',BrandsSchema);