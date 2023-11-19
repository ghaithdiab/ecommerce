import { asyncHandler } from "../types";
import { UserModel } from "../models/UserModel";
import { ReqUSER } from "../types";



//@desc add Adresses to user
//@route /api/v1/adresses
//@access protected user
export const addAdresses = asyncHandler<ReqUSER>(async (req, res) => {
  //$addtoset add Adresses to wish list if Adresses id not existe
  const user=await UserModel.findByIdAndUpdate(req.user.user._id,
    {
    $addToSet:{addresses:req.body}
    },
    {new:true}
  );
  res.status(200).json({status:'success',message:'Adresses added',data:user?.addresses})
})


//@desc remove Adresses
//@route /api/v1/adresses
//@access protected user
export const RemoveAdresses = asyncHandler<ReqUSER>(async (req, res) => {
  const user=await UserModel.findByIdAndUpdate(req.user.user._id,
    {
    $pull:{addresses:{_id:req.params.id}}
    },
    {new:true}
  );
  res.status(200).json({status:'success',message:'Adresses deleted',data:user?.addresses})
})


//@desc GET logged user adresses
//@route /api/v1/adresses
//@access protected user
export const getAdresses = asyncHandler<ReqUSER>(async (req, res) => {
  const user=await UserModel.findById(req.user.user._id).populate('addresses');
  res.status(200).json({status:'success',results:user?.addresses.length,data:user?.addresses})
})

