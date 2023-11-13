import mongoose from "mongoose";


const couponModule=new mongoose.Schema(
  {
    name:{
      type:String,
      trime:true,
      required:[true, 'coupon name required'],
      unique:true
    },
    expire:{
      type:Date,
      required:[true,'coupon expiration Date required']
    },
    discount:{
      type:Number,
      required:[true,'coupon discount value  required']
    }
  },
  {timestamps:true}
)

export const coupon=mongoose.model('Coupon',couponModule);