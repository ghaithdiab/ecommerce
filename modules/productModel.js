import mongoose from "mongoose";

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
    ref:'Category',
    require:[true , "product must belong to category"]
  },
  subCategories:[{
    type:mongoose.Schema.ObjectId,
    ref:'SubCategory',
  }],
  brand:{
    type:mongoose.Schema.ObjectId,
    ref:'Brand'
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

},{timestamps:true})

const productModel=mongoose.model('Product',product);


product.pre(/^find/,(next)=>{
  this.populate({
    path:'category',
    select:'name'
  });
  next();
})


export default productModel