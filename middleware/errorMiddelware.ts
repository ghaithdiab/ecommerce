import { ApiErrors } from "../util/ApiErrors.js";

const sendErrorForDev=(err,res)=>{
  res.status(err.statusCode).json({
    status:err.status,
    error:err,
    message:err.message,
    stack:err.stack
  });
}


const sendErrorForProd=(err,res)=>{
  res.status(err.statusCode).json({
    status:err.status,
    error:err,
    message:err.message,
  });
}

const handelJwtInvalideSignateur =()=>
new ApiErrors("Invalid Token , please login again ...",401)

const handelJwtExpired=()=>
new ApiErrors('Your session Expired please login again');

const globalError=(err,req,res,next)=>{
  err.statusCode=err.statusCode ||500;
  err.status=err.status || 'error';
  if(process.env.NODE_ENV ==='developement'){
    sendErrorForDev(err,res);
  }else{
    if(err.name ==='JsonWebTokenError') err= handelJwtInvalideSignateur();
    if(err.name ==='TokenExpiredError') err=handelJwtExpired();
    sendErrorForProd(err,res);
  }
}



export {globalError};