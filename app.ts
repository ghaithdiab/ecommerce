import path from 'path';
import express from 'express';
import morgan from 'morgan';
import "dotenv/config.js";
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import cors from 'cors'
import compression from 'compression';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import { clean } from 'xss-clean/lib/xss.js';
import dbConnection from './config/database.js';
import mountRoutes from './Routes/index.js';
import { ApiErrors } from './util/ApiErrors.js';
import { globalError } from './middleware/errorMiddelware.js';
import { webhookCheckout } from './services/OrderService.js';





//express App
const app=express();

// Enable other domains to access  application
app.use(cors());
app.options('*', cors());

// compress all responses
app.use(compression());

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


app.use(ExpressMongoSanitize());
app.use(clean());

// Limit each IP to 100 requests per `window` (here, per 15 minutes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message:'Too many accounts created from this IP, please try again after an hour',
});

//TODO apply limit for spesific Route 
// Apply the rate limiting middleware to all requests 
app.use('/api', limiter);

// Middleware to protect against HTTP Parameter Pollution attacks
app.use(hpp({
  whitelist: [
    'price',
    'sold',
    'quantity',
    'ratingsAverage',
    'ratingsQuantity',
  ],
}));
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
process.on('unhandledRejection',(err:any)=>{
  console.log(`unhandledRejection Error${err.name }${ err.message}`);
  server.close(()=>{
    console.log('shutting down ....');
    process.exit(1);
  })
})