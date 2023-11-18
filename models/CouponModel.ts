import mongoose from "mongoose";
import { ICoupon } from "../types";

const CouponSchema=new mongoose.Schema<ICoupon>(
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

export const CouponModel=mongoose.model('Coupon',CouponSchema);