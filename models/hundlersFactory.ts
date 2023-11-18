import asyncHandler from "express-async-handler";
import { ApiErrors } from "../util/ApiErrors.js";
import ApiFeateurs from "../util/apiFeateurs.js";
import mongoose from "mongoose";
import { IModel, filterObjectRequest } from "../types.js";

const  deleteOn=(model:mongoose.Model<IModel & Document>)=>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await model.findByIdAndDelete(id);

    if (!document) {
      return next(new ApiErrors(`No document for this id ${id}`, 404));
    }

    // Trigger "remove" event when update document
    document.deleteOne();
    res.status(204).send();
  });


const updateOne=(model:mongoose.Model<IModel & Document>)=>
asyncHandler(async (req, res, next) => {
  const document = await model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!document) {
    return next(
      new ApiErrors(`No document for this id ${req.params.id}`, 404)
    );
  }
  // Trigger "save" event when update document
  document.save();
  res.status(200).json({ data: document });
});



const createOne=(model:mongoose.Model<IModel & Document>)=>
  asyncHandler(async (req, res) => {
    const newDoc = await model.create(req.body);
    res.status(201).json({ data: newDoc });
  });


  const getOne=(model:mongoose.Model<IModel & Document>, populationOpt:any=null)=>
  asyncHandler((async(req,res,next)=>{
    const {id} =req.params;
    // 1) Build query
    let query = model.findById(id);
    if (populationOpt) {
      query = query.populate(populationOpt);
    }
    const document=await query;
    if(!document) return next(new ApiErrors(`no document for this ${id}`,404));
    res.status(200).json({data: document});
  }))


  const getAll=(model:mongoose.Model<IModel & Document>,modelName:string='')=>
  
  asyncHandler((async(req,res)=>{
    let filter={};
    if(req.filterObject) {filter=req.filterObject};
    const countDocuments=await model.countDocuments();
    const feateurs=new ApiFeateurs(model.find(filter),req.query)
    .paginate(countDocuments)
    .filter()
    // .search(modelName)
    .fields()
    .sort()
    
  
    const {mongoosQuery, paginationResult}=feateurs;
  
    const documents=await mongoosQuery;
    res.status(200).json({resultes: documents.length,paginationResult,data: documents});
  }))  
export {deleteOn,updateOne,createOne ,getOne ,getAll}