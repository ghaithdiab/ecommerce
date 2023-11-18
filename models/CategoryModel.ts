import mongoose from "mongoose";
import { ICategory } from "../types";

const CategorySchema=new mongoose.Schema<ICategory>({
  name:{
    type:String,
    require:[true, 'Category Required'],
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

const setImageURL=(doc:ICategory)=>{
  if(doc.image){
    const imgeURL=`${process.env.BASE_URL}/categoriesImages/${doc.image}`;
    doc.image=imgeURL;
  }
}

CategorySchema.post('init',(doc:ICategory)=> setImageURL(doc));
CategorySchema.post('save',(doc:ICategory)=> setImageURL(doc));

export const CategoryModel=mongoose.model<ICategory & Document>('Category',CategorySchema);


