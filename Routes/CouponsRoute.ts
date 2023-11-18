import express from 'express';
import {protect,AllowedTo} from '../services/AuthService.js'
import { createCoupon, deleteCoupon, getCoupon, getCoupons, updateCoupon } from '../services/CouponService.js';

const CouponsRouter=express.Router();



CouponsRouter.route('/').get(getCoupons)
.post(protect,
  AllowedTo("admin","manger"),
  createCoupon);
CouponsRouter.route('/:id').get(getCoupon)
.put(protect,
  AllowedTo("admin","manger"),
  updateCoupon)
  .delete(protect,
    AllowedTo("admin","manger"),
    deleteCoupon);


export default CouponsRouter