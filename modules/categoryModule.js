import mongoose from "mongoose";

const categorySchema=new mongoose.Schema({
  name:{
    type:String,
    require:[true, 'Category Required'],
    unique:[true,'Category must be unique'],
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
    const imgeURL=`${process.env.BASE_URL}/categoriesImages/${doc.image}`;
    doc.image=imgeURL;
  }
}

categorySchema.post('init',(doc)=> setImageURL(doc));
categorySchema.post('save',(doc)=> setImageURL(doc));

const categoryModel=mongoose.model('category',categorySchema);


export default categoryModel