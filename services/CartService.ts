import asyncHandler from "express-async-handler";
import { ApiErrors } from "../util/ApiErrors.js";
import productModel from "../models/productModel.js";
import { cartModel } from "../models/CartModel.js";
import { coupon } from "../models/CouponModel.js";

//static methode 

const calcTotalprice=(cart)=>{
    //calc total price
    let totalPrice=0;
    cart.cartItmes.forEach((item) => {
      totalPrice += item.price * item.quantity;
    }); 
    cart.totalCartPrice = totalPrice;
    cart.totalPriceAfterDiscount = undefined;
    return totalPrice;
}

// @desc    Add product to cart
// @route   GET /api/v1/cart
// @access  privat/protcted user

export const addProductToCart=asyncHandler(async(req,res,next)=>{
  const {productId,color}=req.body;
  const product= await productModel.findById(productId);
  // 1 - get cart for logged user
  let cart=await cartModel.findOne({user:req.user._id});

  if(!cart){
    //create cart for logged user with product
    cart=await cartModel.create({
      user:req.user._id,
      cartItmes:[{product:productId,color:color,price:product.price}]
    })
  }else{
    // product exist update product quantity
    const productIndex=cart.cartItmes.findIndex(item=>item.product.toString()===productId && item.color===color);
    if(productIndex>-1){
      const cartItem=cart.cartItmes[productIndex];
      cartItem.quantity+=1;
      cart.cartItmes[productIndex]=cartItem;
    }else{
      //product not exist push to cartitme
      cart.cartItmes.push({product:productId,color:color,price:product.price})
    }
  }

  calcTotalprice(cart); 
  await cart.save();
  res.status(201).json({status:'success',message:'Prodect Added to Cart',numOfCartItems: cart.cartItmes.length,data:cart})

})



// @desc    get logged user cart
// @route   GET /api/v1/cart
// @access  privat/protcted user

export const getLoggedUserCart=asyncHandler(async(req,res,next)=>{
  const cart=await cartModel.findOne({user:req.user._id});
  if(!cart) next(new ApiErrors('there is no cart for this user id',404))
  res.status(200).json({success:true,nmbrOfCartItem:cart.cartItmes.length,data:{cart}})

})



//@desc remove spicific cart itme  
//@route /api/v1/cart/id
//@access protected user
export const RemoveSpiceficCartItme = asyncHandler(async (req, res) => {
  const cart = await cartModel.findOneAndUpdate(
    
    { user: req.user._id},
    {
      $pull: { cartItmes: { _id: req.params.id } },
    },
    { new: true }
  );
  calcTotalprice(cart);
  cart.save();
  res.status(200).json({success:true,nmbrOfCartItem:cart.cartItmes.length,data:{cart}})})


// @desc remove cart for spesific user
//@Route /api/v1/cart
//@axxess protected user

export const RemoveCartForSpesificUser=asyncHandler(async(req,res,next)=>{
  await cartModel.findOneAndDelete({ user: req.user._id });
  res.status(204).json({success:true,message:"the cart has been deleted"});
})




// @desc update cartitem quantity
//@Route /api/v1/cart
//@axxess protected user

export const updateCartItemQuantity=asyncHandler(async(req,res,next)=>{
  const {quantity}=req.body;
  const cart=await cartModel.findOne({user:req.user._id})
  if(!cart){
    return next(new ApiErrors("There is no cart for this user",404));
  }
  const index=cart.cartItmes.findIndex(item=>item._id.toString()===req.params.id);
  if(index>-1){
    cart.cartItmes[index].quantity=quantity;
  }else{
    return next(new ApiErrors("This item not found in the cart",404))
  }
  calcTotalprice(cart);
  await cart.save();
  res.status(200).json({success:true,nmbrOfCartItem:cart.cartItmes.length,data:{cart}})
})


// @desc Apply Coupon on cart
//@Route /api/v1/cart
//@axxess protected user

export const applyCoupon=asyncHandler(async(req,res,next)=>{
  // 1- get coupon based on copon 
  const Coupon = await coupon.findOne({name:req.body.coupon,expire:{$gt:Date.now()}});
  if(!Coupon){
    return next(new ApiErrors('invalid coupone',400));
  }
  // 2- get logged user cart to get total cart price
  const cart=await cartModel.findOne({user:req.user._id});

  const totalPrice=cart.totalCartPrice;
  const priceAfterdiscountedAmount=(totalPrice -((totalPrice*Coupon.discount)/100)).toFixed(2);
  cart.totlaCartPriceAfterDiscount=priceAfterdiscountedAmount;
  await cart.save();
  res.status(200).json({success:true,nmbrOfCartItem:cart.cartItmes.length,data:{cart}})
})

//TODO apply coupon just one time for user 