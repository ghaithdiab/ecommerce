import express from 'express';
import {protect,AllowedTo} from '../services/AuthService.js'
import { createCashOrder, filterOrderForLoggedUser, findAllOrders, findSpecificOrder, updateOrderStatus, updateOrderToPaid } from '../services/OrderService.js';
import { checkoutSessionStripe } from '../services/paymentsProvidersService.js';

const ordersRouter=express.Router();


// ordersRouter.use(protect,AllowedTo('user'));

ordersRouter.route('/checkout-Session-Stripe/:cartId').get(protect,AllowedTo('user'),checkoutSessionStripe);
ordersRouter.route('/:cartId').post(protect,AllowedTo('user'),createCashOrder);
ordersRouter.route('/').get(protect,AllowedTo('user','admin','manger'),filterOrderForLoggedUser,findAllOrders);
ordersRouter.route('/:id').get(protect,AllowedTo('user','admin','manger'),filterOrderForLoggedUser,findSpecificOrder)
ordersRouter.route('/:id/pay').put(protect,AllowedTo('admin','manger'),updateOrderToPaid);
ordersRouter.route('/:id/updateStatus').put(protect,AllowedTo('user','admin','manger'),updateOrderStatus);//TODO refactor logic of cancel make anoth route to cancel order by user


export default ordersRouter