import mongoose from "mongoose";
import { IOrder, orderStatus, paymentMethodType } from "../types";
import { ProductModel } from "./productModel";
import { UserModel } from "./UserModel";


const OrderSchema = new mongoose.Schema<IOrder>(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: UserModel,
      required: [true, 'Order must be belong to user'],
    },
    cartItems: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: ProductModel,
        },
        quantity: Number,
        color: String,
        price: Number,
      },
    ],

    taxPrice: {
      type: Number,
      default: 0,
    },
    shippingAddress: {
      details: String,
      phone: String,
      city: String,
      postalCode: String,
    },
    shippingPrice: {
      type: Number,
      default: 0,
    },
    totalOrderPrice: {
      type: Number,
    },
    paymentMethodType: {
      type: String,
      enum: [paymentMethodType.card,paymentMethodType.cash],
      default: paymentMethodType.cash,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: Date,
    orderStatus: {
      type: String,
      enum: [orderStatus.pending, orderStatus.preparing,orderStatus.shipping,orderStatus.delivered,orderStatus.cancelled],
      default: orderStatus.pending,
    },
    deliveredAt: Date,
  },
  { timestamps: true }
);


//TODO test 
OrderSchema.pre(/^find/, function (this:any,next) {
  this.populate('user' as keyof IOrder,'name profileImg email phone').populate('cartItems.product' as keyof IOrder,'title imageCover ');

  next();
});

export const OrderModel = mongoose.model<IOrder & Document>('Order', OrderSchema);