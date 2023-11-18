//TODO add validation layer to cart Router 

import { check} from "express-validator";
import { validatorMiddelWare } from "../../middleware/validatorMiddelware.js";
import { cartModel } from "../../models/CartModel.js";
import { ApiErrors } from "../ApiErrors.js";

export const RemoveSpiceficCartItmeValidator=[
  check('id').notEmpty().isMongoId().withMessage('invalid cart id')
  .custom(async(val,{req})=>{
    const item=await cartModel.find({cartItmes:{_id:val}});
    if(!item) throw new ApiErrors("this cart is not exist",400);
      return true;
  }),
  validatorMiddelWare
]