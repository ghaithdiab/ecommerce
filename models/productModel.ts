import mongoose from "mongoose";
import { CategoryModel } from "./CategoryModel.js";
import { subCategoryModel } from "./SubCategoryModel.js";
import { BrandModel } from "./BrandsModel.js";
import { IProduct } from "../types.js";

const ProductSchema=new mongoose.Schema<IProduct>({
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
    ref:CategoryModel,
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

ProductSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'product',
  localField: '_id',
});
ProductSchema.pre(/^find/,function(this:any,next){
  this.populate({
    path:'category',
    select:'name'
  });
  next();
})


const setImageURL=(doc:IProduct)=>{
  if(doc.imageCover){
    const imgeURL=`${process.env.BASE_URL}/productImages/${doc.imageCover}`;
    doc.imageCover=imgeURL;
  }
  if(doc.images){
    const imageList:string[]=[];
    doc.images.forEach(image => {
      const imgeURL=`${process.env.BASE_URL}/productImages/${image}`;
      imageList.push(imgeURL)
    });
    doc.images=imageList;
  }
}

ProductSchema.post('init',(doc:IProduct)=> setImageURL(doc));
ProductSchema.post('save',(doc:IProduct)=> setImageURL(doc));


export const ProductModel=mongoose.model<IProduct & Document>('Product',ProductSchema);
