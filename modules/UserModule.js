import mongoose, { Schema } from "mongoose";


const user=new Schema({
  name:{
    type:String,
    trime:true,
    required:[true , "name is required"],
  },
  slug:{
    type:String,
    lowercase:true
  },
  email:{
    type:String,
    required:[true,"Email is Required"],
    unique:true,
    lowercase:true
  },
  phone:String,
  profilImg:String,
  password:{
    type:String,
    required:[true,"Password Is Required"],
    minlength:[8,"password too short"]
  },
  role:{
    type: String,
    enum:["user","admin"],
    default:"user"
  },
  active:{
    type:Boolean,
    default:true
  }
},{timestamps:true})


const User=mongoose.model('user',user);


export default User;