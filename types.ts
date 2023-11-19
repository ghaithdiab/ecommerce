import mongoose, { PopulatedDoc } from "mongoose";
import { Request, Response, NextFunction, RequestHandler } from 'express';

export interface ApiFeateursQueryOption{
  sort?:string,
  fields?:string,
  keyword?:string,
  page?:number,
  limit?:number,
}

export class pagination{
  public CurrentPage:number;
  public limit:number;
  public numberOfPages:number;
  public next:number | undefined;
  public prev:number | undefined;
  constructor(CurrentPage:number,limit:number,numberOfPages:number){
    this.CurrentPage=CurrentPage;
    this.limit=limit;
    this.numberOfPages=numberOfPages;
  }

}

export enum paymentMethodType{
  card='card',
  cash='cash'
}

export enum orderStatus{
  pending="pending",
  preparing="preparing",
  shipping='shipping',
  delivered="delivered",
  cancelled="cancelled"
}

export enum UserRole{
  user="user",
  manager="manger",
  admin="admin"
}

export interface IBrands{
  name:string;
  slug:string;
  image:string;
  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICart{
  cartItmes:{
    product:typeof mongoose.Schema.ObjectId,
    quantity:number,
    color:string,
    price:number
  }[];
  user:typeof mongoose.Schema.ObjectId;
  totalCartPrice:number;
  totlaCartPriceAfterDiscount:number;
    // Timestamps
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ICategory{
  name:string;
  slug:string;
  image:string;
  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICoupon{
  name:string;
  expire:Date;
  discount:number;
  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IOrder{
  user:PopulatedDoc<IUser & Document>;
  cartItems:{
    product:typeof mongoose.Schema.ObjectId,
    quantity: Number,
    color: String,
    price: Number,
  }[];
  taxPrice:number,
  shippingAddress:{
    details: String,
    phone: String,
    city: String,
    postalCode: String,
  };
  shippingPrice:number;
  totalOrderPrice:number;
  paymentMethodType:paymentMethodType;
  isPaid:boolean;
  paidAt:Date;
  orderStatus:orderStatus,
  deliveredAt:Date;
  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProduct{
  name:string;
  slug:string;
  description:string;
  quantity:number;
  solde:number;
  price:number;
  priceAfterDiscount:number;
  colors:string[];
  imageCover:string;
  images:string[];
  category:PopulatedDoc<ICategory & Document>;
  subCategories: typeof mongoose.Schema.Types.ObjectId;
  brand:typeof mongoose.Schema.Types.ObjectId;
  ratingAverage:number;
  ratingQuantity:number;
  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
  // to enable virtual populate
  toJSON: { virtuals: boolean },
  toObject: { virtuals: boolean },
}

export interface IReview{
  title:string;
  ratings:number;
  user:PopulatedDoc<IUser & Document>;
  product:typeof mongoose.Schema.Types.ObjectId;
  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISubCategory{
  name:string;
  slug:string;
  category:PopulatedDoc<ICategory & Document>;
  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IUser{
  _id:string;
  name:string;
  slug:string;
  email:string;
  phone:string;
  profileImg:string;
  password:string;
  passwordChangedAt: Date,
  passwordResetCode: String |undefined,
  passwordResetExpires: Date |undefined,
  passwordResetVerified: Boolean |undefined,
  role:UserRole;
  active:boolean;
  wishlist:PopulatedDoc<IProduct & Document>[];
  addresses:{
    id:typeof mongoose.Schema.Types.ObjectId;
    alias: String,
    details: String,
    phone: String,
    city: String,
    postalCode: String,
  }[];
  //TODO orders: PopulatedDoc<IOrder & Document>[],
  // Timestamps
  createdAt?: Date;
  updatedAt?: Date; 
}


 // Extend the Request type definition
  // Extend the Request type definition
export interface CustomRequest<T> extends Request {
  filterObject?: T;
  user:T;
  file:T;
}


export const asyncHandler = <T>(
  handler: (req: CustomRequest<T>, res: Response<any>, next: NextFunction) => Promise<void>
): RequestHandler => {
  return (req: Request, res: Response<any>, next: NextFunction) => {
    handler(req as CustomRequest<T>, res, next).catch(next);
  };
};

export interface filterObject{
  product?:mongoose.Types.ObjectId;
}

export interface ReqUSER{
  user:IUser;
  // id:mongoose.Types.ObjectId;
}
// Define a custom request type that includes the necessary properties
export interface ResiezImageRequest extends Request {
  file: {
    buffer: Buffer;
  };
}


// Define a custom response type that includes the missing properties
export interface CustomResponse extends Response {
  headers: any; // Adjust this according to your needs
  ok: boolean; // Adjust this according to your needs
  redirected: boolean; // Adjust this according to your needs
  statusText: string; // Adjust this according to your needs
  // Add any other missing properties
}