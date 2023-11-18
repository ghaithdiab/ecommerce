import mongoose from "mongoose";
import { ICart } from "../types.js";
import { ProductModel } from "./productModel.js";
import { UserModel } from "./UserModel.js";

const cartSchema=new mongoose.Schema<ICart>({
  cartItmes:[
    {
      product:{
        type:mongoose.Schema.ObjectId,
        ref:ProductModel
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
    ref:UserModel
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



export const CartModel=mongoose.model('cart',cartSchema);