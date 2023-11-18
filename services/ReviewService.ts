/* eslint-disable import/extensions */

import {Review} from '../models/ReviewModel.js';
import { createOne, deleteOn, getAll, getOne, updateOne } from "../models/hundlersFactory.js";


//Nested Route
//@desc get All Reviews for spicific product
//@Route get /api/v1/product/:productId/Reviews

export const createFilterObject=(req,res,next)=>{
  let filterObject={};
  if(req.params.productId) filterObject={product: req.params.productId}
  req.filterObject=filterObject;
  next();
}


//@desc get All Review
//@Route Get /api/v1/Reviews
//@Access public
const getReviews=getAll(Review);

//desc get Review By Id
// Route Get /api/v1/Reviews:id
//@Access public

const getReview=getOne(Review);


// Nested route (Create)
export const setProductIdAndUserIdToBody = (req, res, next) => {
  if (!req.body.product) req.body.product = req.params.productId;
  if(!req.body.user) req.body.user=req.user._id;
  next();
};

//@desc create Review
//@Rout Post /api/v1/Reviews
//@Access private / producted /user
const createReview= createOne(Review);


//@dec update spicific Review
//@Route Put /api/v1/Reviews/:id
//@Access privet /producted /user

const updateReview=updateOne(Review);

//@desc Delete Review
//@Route Delete /api/v1/Reviews/:id
//@Access private / producted / user / Admin / manger


const deleteReview=deleteOn(Review);

export {getReviews,getReview, createReview, updateReview,deleteReview}