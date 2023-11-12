import express from 'express';
import {protect,AllowedTo} from '../services/AuthService.js'
import { createFilterObject, createReview, deleteReview, getReview, getReviews, updateReview,setProductIdAndUserIdToBody } from '../services/ReviewService.js';
import { createReviewValidator, deleteReviewValidator, getReviewValidator, updateReviewValidator } from '../util/validators/ReviewValidator.js';


const ReviewsRouter=express.Router({mergeParams:true});





ReviewsRouter.route('/').get(createFilterObject,getReviews)
.post(protect,
  AllowedTo("user"),
  setProductIdAndUserIdToBody,
  createReviewValidator,
  createReview);
ReviewsRouter.route('/:id').get(getReviewValidator,getReview)
.put(protect,
  AllowedTo("user"),
  updateReviewValidator,
  updateReview)
  .delete(protect,
    AllowedTo("user","admin","manger"),
    deleteReviewValidator,
    deleteReview
    );


export default ReviewsRouter