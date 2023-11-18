import multer from "multer";
import { ApiErrors } from "../util/ApiErrors.js";


const multerOptions=()=>{
  // 1- diskStorge
// const multerStorage=multer.diskStorage({
//   destination:(req,file,cb)=>{
//     cb(null,'uploads/categories');
//   },
//   filename:(req,file,cb)=>{
//     const ext=file.mimetype.split('/')[1];
//     const filename=`category-${uuidv4()}-${Date.now()}.${ext}`;
//     cb(null,filename);
//   }
// })


// 2- memoryStorge
const multerStorage = multer.memoryStorage();


const multerFilter=(req,file,cb)=>{
  if(file.mimetype.startsWith('image')){
    cb(null,true)
  }else cb(new ApiErrors("only images are allowed",400),false)
}

const uploads=multer({storage:multerStorage ,fileFilter:multerFilter});
return uploads;
}

export const uploadSingleImage=(fildName)=>multerOptions().single(fildName);



export const uploadMultipImage=(arrayOfFilds)=>multerOptions().fields(arrayOfFilds);