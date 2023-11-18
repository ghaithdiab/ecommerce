import express from 'express';
import {protect,AllowedTo} from'../services/AuthService.js';
import { RemoveProductfromWishList, addProductToWishList, getLoggedUserWishList } from '../services/WishlistService.js';
import { RemoveproductFromwishListValidator, addproductTowishListValidator } from '../util/validators/wishlistValidator.js';

export const wishlistRoute=express.Router();

wishlistRoute.use(protect,AllowedTo('user'));


wishlistRoute.route('/').post(
  addproductTowishListValidator,
  addProductToWishList
  ).get(getLoggedUserWishList);
wishlistRoute.route('/:id').delete(
  RemoveproductFromwishListValidator,
  RemoveProductfromWishList
  )

