import mongoose, { PopulatedDoc } from "mongoose";

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
  name:string;
  slug:string;
  email:string;
  phone:string;
  profileImg:string;
  password:string;
  passwordChangedAt: Date,
  passwordResetCode: String,
  passwordResetExpires: Date,
  passwordResetVerified: Boolean,
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

export interface IModel{
  model:IBrands | ICart |ICategory |ICoupon | IOrder |IProduct |IReview |ISubCategory | IUser;
}

 // Extend the Request type definition
  // Extend the Request type definition
export interface filterObjectRequest<T> extends Request {
  filterObject?: T;
}