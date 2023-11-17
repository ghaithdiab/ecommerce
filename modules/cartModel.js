import mongoose from "mongoose";
import productModel from "./productModel.js";


const cartSchema=new mongoose.Schema({
  cartItmes:[
    {
      product:{
        type:mongoose.Schema.ObjectId,
        ref:productModel
      },
      quantity:{
        type:Number,
        default:1
      },  
      color:String,
      price:Number
    }
  ],
  user:{
    type:mongoose.Schema.ObjectId,
    ref:"user"
  },
  totalCartPrice:Number,
  totlaCartPriceAfterDiscount:Number,
},{
  timestamps:true,
});

//TODO give erreur importent to send product info to cart not just id
// cartSchema.pre(/^find/,function(next){
//   this.populate({
//     path:'product', 
//     select:'_id name description imageCover'
//   });
//   next();
// })



export const cartModel=mongoose.model('cart',cartSchema);