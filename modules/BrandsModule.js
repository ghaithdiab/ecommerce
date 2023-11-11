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

const setImageURL=(doc)=>{
  if(doc.image){
    const imgeURL=`${process.env.BASE_URL}/brandsImages/${doc.image}`;
    doc.image=imgeURL;
  }
}

Brands.post('init',(doc)=> setImageURL(doc));
Brands.post('save',(doc)=> setImageURL(doc));

const BrandModel=mongoose.model('Brand',Brands);


export default BrandModel