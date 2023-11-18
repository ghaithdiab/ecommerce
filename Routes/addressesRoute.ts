import express from 'express';
import {protect,AllowedTo} from'../services/AuthService.js';
import { RemoveAdresses, addAdresses, getAdresses } from '../services/AdressesService.js';

export const addressesRoute=express.Router();

addressesRoute.use(protect,AllowedTo('user'));


addressesRoute.route('/').post(
  addAdresses
  ).get(getAdresses);
addressesRoute.route('/:id').delete(
  RemoveAdresses,
  )

