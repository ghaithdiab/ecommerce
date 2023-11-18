//@ des find validation Error
import { validationResult } from "express-validator";

const validatorMiddelWare= (req,res,next)=>{
  const err= validationResult(req);
  if(!err.isEmpty()) return res.status(400).json({err: err.array()})
  next();
}


export {validatorMiddelWare}  