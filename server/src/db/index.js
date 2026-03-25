import mongoose from "mongoose"
const connectToDb = async()=>{
  try {
    const url = process.env.MONGO_DB_URI
   const connectionInstacne = await mongoose.connect(`${url}/journal`);
   console.log("MongoDb connected",url);
  } catch (error) {
    console.log("Error while connecting database",error);
    process.exit(1);
  }
}
export default connectToDb;