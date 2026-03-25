import app from "./app.js";
import connectToDb from "./db/index.js";
import dotenv from "dotenv";
dotenv.config({
  path: './.env'
})
const PORT = process.env.PORT;
connectToDb()
.then(()=>{
  app.listen(PORT, ()=>{
    console.log("Server is running at the PORT: ",PORT);
  })
}
).catch((err)=>{
  console.log(err);
})