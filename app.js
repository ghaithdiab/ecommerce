import path from 'path';
import express from 'express';
import morgan from 'morgan';
import "dotenv/config.js";
import dbConnection from './config/database.js';
import mountRoutes from './Routes/index.js';
import { ApiErrors } from './util/ApiErrors.js';
import { globalError } from './middleware/errorMiddelware.js';
import { webhookCheckout } from './services/OrderService.js';
//express App
const app=express();

//connection DB

dbConnection();

//Middelwares

app.use(express.json({limit:"20kb"}));
// Checkout webhook
app.post(
  '/webhook-checkout',
  express.raw({ type: 'application/json' }),
  webhookCheckout
);

// eslint-disable-next-line no-undef
app.use(express.static(path.join('uploads')));
if(process.env.NODE_ENV === 'developement'){
  app.use(morgan('dev'));
  console.log(`mode : ${process.env.NODE_ENV}`);
}

//Routes
// Mount Routes
mountRoutes(app);

app.all('*',(req,res,next)=>{next((new ApiErrors(`can't find url"${req.originalUrl}`,400)))})
//global handling errors

app.use(globalError)
const port=process.env.PORT  ||8000;
const server=app.listen(port,()=>{
  console.log(`App runing on port ${process.env.PORT}`);
})


// handiling rejections outsid express
process.on('unhandledRejection',(err)=>{
  console.log(`unhandledRejection Error${err.name }${ err.message}`);
  server.close(()=>{
    console.log('shutting down ....');
    process.exit(1);
  })
})