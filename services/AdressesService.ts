import asyncHandler from "express-async-handler";
import {User as userModel} from '../models/UserModel.js';



//@desc add Adresses to user
//@route /api/v1/adresses
//@access protected user
export const addAdresses = asyncHandler(async (req, res) => {
  //$addtoset add Adresses to wish list if Adresses id not existe
  const user=await userModel.findByIdAndUpdate(req.user._id,
    {
    $addToSet:{addresses:req.body}
    },
    {new:true}
  );
  res.status(200).json({status:'success',message:'Adresses added',data:user.addresses})
})


//@desc remove Adresses
//@route /api/v1/adresses
//@access protected user
export const RemoveAdresses = asyncHandler(async (req, res) => {
  const user=await userModel.findByIdAndUpdate(req.user._id,
    {
    $pull:{addresses:{_id:req.params.id}}
    },
    {new:true}
  );
  res.status(200).json({status:'success',message:'Adresses deleted',data:user.addresses})
})


//@desc GET logged user adresses
//@route /api/v1/adresses
//@access protected user
export const getAdresses = asyncHandler(async (req, res) => {
  const user=await userModel.findById(req.user._id).populate('addresses');
  res.status(200).json({status:'success',results:user.addresses.length,data:user.addresses})
})

