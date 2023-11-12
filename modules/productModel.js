import mongoose from "mongoose";
import categoryModel from "./categoryModule.js";
import { subCategoryModel } from "./subCategoryModule.js";
import BrandModel from "./BrandsModule.js";

const product=mongoose.Schema({
  name:{
    type:String,
    require:[true, 'Product Required'],
    trime:true,
    minlength:[3,'Too Short name'],
    maxlength:[250,'Too long name']
  },
  slug:{
    type:String,
    require:true,
    lowercase:true
  },
  description:{
    type:String,
    require:[true, 'description product Require'],
    minlength:[20, 'Too Short description'],
  },
  quantity:{
    type:Number,
    require:[true, "quantity Of product is require"]
  },
  solde:{
    type:Number,
    default:0
  },
  price:{
    type:Number,
    require:[true ,"Porduct must have price"],
    trime:true,
    // maxlength:[20 ,]
  },
  priceAfterDiscount:{
    type:Number
  },
  colors:[String],
  imageCover:{
    type:String,
    require:[true,"Image cover is required"]
  },
  images:[String],
  category:{
    type:mongoose.Schema.ObjectId,
    ref:categoryModel,
    require:[true , "product must belong to category"]
  },
  subCategories:[{
    type:mongoose.Schema.ObjectId,
    ref:subCategoryModel,
  }],
  brand:{
    type:mongoose.Schema.ObjectId,
    ref:BrandModel
  },
  ratingAverage:{
    type:Number,
    min:[1,"Rating must be above or equal  from 1"],
    max:[5,"Rating must be below or equal  from 5"]
  },
  ratingQuantity:{
    type:Number,
    default:0
  }

},{
  timestamps:true,
   // to enable virtual populate
   toJSON: { virtuals: true },
   toObject: { virtuals: true },
})

product.virtual('reviews', {
  ref: 'Review',
  foreignField: 'product',
  localField: '_id',
});
product.pre(/^find/,function(next){
  this.populate({
    path:'category',
    select:'name'
  });
  next();
})


const setImageURL=(doc)=>{
  if(doc.imageCover){
    const imgeURL=`${process.env.BASE_URL}/productImages/${doc.imageCover}`;
    doc.imageCover=imgeURL;
  }
  if(doc.images){
    const imageList=[];
    doc.images.forEach(image => {
      const imgeURL=`${process.env.BASE_URL}/productImages/${image}`;
      imageList.push(imgeURL)
    });
    doc.images=imageList;
  }
}

product.post('init',(doc)=> setImageURL(doc));
product.post('save',(doc)=> setImageURL(doc));
const productModel=mongoose.model('Product',product);




export default productModel