import { model } from "mongoose";
import { ApiFeateursQueryOption, pagination} from "../types";

class ApiFeateurs{
  public mongoosQuery:any;
  public queryString:ApiFeateursQueryOption;
  public paginationResult:pagination | undefined;
  constructor(mongoosQuery:any,queryString:ApiFeateursQueryOption){
    this.mongoosQuery=mongoosQuery;
    this.queryString=queryString;
  }

  sort(){
    if(this.queryString.sort){
      const sortBy=this.queryString.sort.split(',').join(' ');
      this.mongoosQuery=this.mongoosQuery.sort(sortBy);
    }else{
      this.mongoosQuery=this.mongoosQuery.sort('-createdAt');
    }

    return this;
  }

  fields(){
    if(this.queryString.fields){
      const fields=this.queryString.fields.split(',').join(' ');
      this.mongoosQuery=this.mongoosQuery.select(fields);
    }else{
      this.mongoosQuery = this.mongoosQuery.select("-__v");   // remove __v field 
    }
    return this;
  }

  search(modelName:string){
    // if (this.queryString.keyword) {
    //   let query = {};
    //   if (modelName === 'Products') {
    //     query.$or = [
    //       { title: { $regex: this.queryString.keyword, $options: 'i' } },
    //       { description: { $regex: this.queryString.keyword, $options: 'i' } },
    //     ];
    //   } else {
    //     query = { name: { $regex: this.queryString.keyword, $options: 'i' } };
    //   }

    //   this.mongooseQuery = this.mongooseQuery.find(query);
    // }
    // return this;
  }

  paginate(countDocuments:number){
    const page= this.queryString.page ? this.queryString.page *1 :1;
    const limit=this.queryString.limit? this.queryString.limit *1 : 50;
    // const limit=this.queryString.limit *1 ||50;
    // const page=this.queryString.page *1 ||1;
    const skip=(page-1) * limit; 
    const endIndex=page*limit;

    const paginations:pagination=new pagination(page,limit,Math.ceil(countDocuments/limit));// ex: 50/10= 5 pages

    //next Page
    if(endIndex < countDocuments)paginations.next=page +1;
    //prev Page
    if(skip>0) paginations.prev=page-1;
    this.paginationResult=paginations;
    this.mongoosQuery=this.mongoosQuery.skip(skip).limit(limit);

    return this;
  }

  filter(){
    const queryStringObj={...this.queryString}
    const exculedField=["page","limit","sort","fields"];
   
 //  TODO test 
  // exculedField.forEach(field=>delete queryStringObj[field]);
    exculedField.forEach(field=>delete queryStringObj.fields);

    let  queryString=JSON.stringify(queryStringObj);
    queryString=queryString.replace(/\b(gte|gt|lte|lt)\b/g,(match)=> `$${match}`)

    this.mongoosQuery=this.mongoosQuery.find(JSON.parse(queryString));

    return this;
  }
}




export default ApiFeateurs;