/* eslint-disable import/extensions */
import {coupon} from "../models/CouponModel.js";
import { createOne, deleteOn, getAll, getOne, updateOne } from "../models/hundlersFactory.js";




//@desc get All Coupons
//@Route Get /api/v1/coupons
//@Access private admin -manger 
export const getCoupons=getAll(coupon);

//desc get coupon By Id
// Route Get /api/v1/coupon:id
//@Access privat admin-manger

export const getCoupon=getOne(coupon);

//@desc create coupon
//@Rout Post /api/v1/coupons
//@Access  privat admin-manger
export const createCoupon= createOne(coupon);


//@dec update spicific coupon
//@Route Put /api/v1/coupons/:id
//@Access  privat admin-manger

export const updateCoupon=updateOne(coupon);

//@desc Delete coupon
//@Route Delete /api/v1/coupons/:id
//@Access  privat admin-manger


export const deleteCoupon=deleteOn(coupon);

