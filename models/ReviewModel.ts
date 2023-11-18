import mongoose from "mongoose";
import { ProductModel } from "./productModel";
import { IReview } from "../types";



const ReviewSchema=new mongoose.Schema<IReview>({
  title:{
    type:String
  },
  ratings:{
    type:Number,
    min:[1,'Min rating value is 1.0'],
    max:[5,'Max rating value is 5.0'],
    required:[true, 'rating is required']
  },
  user:{
    type:mongoose.Schema.ObjectId,
    ref:'User',
    required:[true,'Review must belong to a user']
  },
  product:{
    type:mongoose.Schema.ObjectId,
    ref:'Product',
    required:[true,'A review must have a product']
  }
},{timestamps:true});



ReviewSchema.pre(/^find/, function (this:any,next) {
  this.populate({ path: 'user', select: 'name' }); //TODO return image profil with the name by addin sapce field profild image in user module 
  next();
});


ReviewSchema.statics.calcAverageRatingsAndQuantity = async function (productId:number) {
  const result = await this.aggregate([
    // Stage 1 : get all reviews in specific product
    {
      $match: { product: productId },
    },
    // Stage 2: Grouping reviews based on productID and calc avgRatings, ratingsQuantity
    {
      $group: {
        _id: 'product',
        avgRatings: { $avg: '$ratings' },
        ratingsQuantity: { $sum: 1 },
      },
    },
  ]);

  // console.log(result);
  if (result.length > 0) {
    await ProductModel.findByIdAndUpdate(productId, {
      ratingAverage: result[0].avgRatings,
      ratingQuantity: result[0].ratingsQuantity,
    });
  } else {
    await ProductModel.findByIdAndUpdate(productId, {
      ratingAverage: 0,
      ratingQuantity: 0,
    });
  }
};

ReviewSchema.post('save', async function (this:any) {
  await this.constructor.calcAverageRatingsAndQuantity(this.product);
});


//TODO test
ReviewSchema.post('deleteOne', async function (this:any) {
  await this.constructor.calcAverageRatingsAndQuantity(this.product);
});
export const ReviewModel= mongoose.model("Review",ReviewSchema);