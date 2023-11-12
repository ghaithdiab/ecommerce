import asyncHandler from "express-async-handler";
import {User as userModel} from '../modules/UserModule.js';



//@desc add product to wishlist
//@route /api/v1/whishlist
//@access protected user
export const addProductToWishList = asyncHandler(async (req, res) => {
  //$addtoset add product to wish list if product id not existe
  const user=await userModel.findByIdAndUpdate(req.user._id,
    {
    $addToSet:{wishlist:req.body.productId}
    },
    {new:true}
  );
  res.status(200).json({status:'success',message:'product added to wishlist',data:user.wishlist})
})


//@desc remove product from wishlist
//@route /api/v1/whishlist/productId
//@access protected user
export const RemoveProductfromWishList = asyncHandler(async (req, res) => {
  const user=await userModel.findByIdAndUpdate(req.user._id,
    {
    $pull:{wishlist:req.params.productId}
    },
    {new:true}
  );
  res.status(200).json({status:'success',message:'product deleted  from wishlist',data:user.wishlist})
})


//@desc GET logged user whish list
//@route /api/v1/whishlist
//@access protected user
export const getLoggedUserWishList = asyncHandler(async (req, res) => {
  const user=await userModel.findById(req.user._id).populate('wishlist');
  res.status(200).json({status:'success',results:user.wishlist.length,data:user.wishlist})
})

