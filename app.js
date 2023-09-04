import express from 'express';
import morgan from 'morgan';
import "dotenv/config.js";
import dbConnection from './config/database.js';
import mountRoutes from './Routes/index.js';
//express App
const app=express();

//connection DB

dbConnection();

//Middelwares

app.use(express.json());
if(process.env.NODE_ENV == 'developement'){
  app.use(morgan('dev'));
  console.log(`mode : ${process.env.NODE_ENV}`);
}

//Routes
// Mount Routes
mountRoutes(app);

const port=process.env.PORT  ||8000;
app.listen(port,()=>{
  console.log(`App runing on port ${process.env.PORT}`);
})