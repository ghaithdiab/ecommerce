import asyncHandler from "express-async-handler";
// eslint-disable-next-line import/no-extraneous-dependencies
import Stripe from "stripe";
import { ApiErrors } from "../util/ApiErrors.js";
import { cartModel } from "../models/CartModel.js";



// @desc    Get checkout session from stripe and send it as response
// @route   GET /api/v1/orders/checkout-session-Strip/cartId
// @access  Protected/User
export const checkoutSessionStripe = asyncHandler(async (req, res, next) => {
  //TODO app settings
  const taxPrice = 0;
  const shippingPrice = 0;

  // 1) Get cart depend on cartId
  const cart = await cartModel.findById(req.params.cartId);
  if (!cart) {
    return next(
      new ApiErrors(`There is no such cart with id ${req.params.cartId}`, 404)
    );
  }

  //TODO   3) create array of ligne item object depanding on cartItem


  // 2) Get order price depend on cart price "Check if coupon apply"
  const cartPrice = cart.totlaCartPriceAfterDiscount ? cart.totlaCartPriceAfterDiscount : cart.totalCartPrice;


  const totalOrderPrice = cartPrice + taxPrice + shippingPrice;

  // 3) Create stripe checkout session
  const stripeInstance = Stripe(process.env.STRIP_TOKEN);
  const session = await stripeInstance.checkout.sessions.create({
    line_items: [
      {
        price_data:{
          currency:'eur', //TODO app Setting
          unit_amount:totalOrderPrice *100,
          product_data:{
            name:'exsample'
          },
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${req.protocol}://${req.get('host')}/orders`,
    cancel_url: `${req.protocol}://${req.get('host')}/cart`,
    customer_email: req.user.email,
    client_reference_id: req.params.cartId,
    metadata: req.body.shippingAddress,
  });

  // 4) send session to response
  res.status(200).json({ status: 'success', session });
});