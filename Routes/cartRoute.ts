import express from 'express';
import {protect,AllowedTo} from '../services/AuthService.js'
import { RemoveCartForSpesificUser, RemoveSpiceficCartItme, addProductToCart, applyCoupon, getLoggedUserCart, updateCartItemQuantity } from '../services/CartService.js';
import { RemoveSpiceficCartItmeValidator } from '../util/validators/cartValidator.js';

const CartRouter=express.Router();



CartRouter.route('/').get(protect,AllowedTo('user'),getLoggedUserCart)
.post(protect,
  AllowedTo('user'),
  addProductToCart).delete(protect,AllowedTo('user'),RemoveCartForSpesificUser);
CartRouter.route('/applyCoupon').put(protect,AllowedTo('user'),applyCoupon);
CartRouter.route('/:id').put(protect,AllowedTo('user'),updateCartItemQuantity).delete(protect,AllowedTo('user'),RemoveSpiceficCartItmeValidator,RemoveSpiceficCartItme);

export default CartRouter