import mongoose from "mongoose";


const cartSchema=new mongoose.Schema({
  cartItmes:[
    {
      product:{
        type:mongoose.Schema.ObjectId,
        ref:'product'
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


export const cartModel=mongoose.model('cart',cartSchema);