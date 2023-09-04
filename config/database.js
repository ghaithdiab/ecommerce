import mongoose from 'mongoose';

const dbConnection=()=>{

  mongoose.connect(process.env.DB_URL).then((conn)=>{
    console.log(`Database Connected ${conn.connection.host}`)
  }).catch((err)=>{
    console.log(`Database Connection Faild ${err}`)
    process.exit(1)
  })
}

export default dbConnection