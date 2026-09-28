import "dotenv/config"; 
import dns from "node:dns" // dns problem temp solution
import mango from "mongoose"
import { DB_NAME } from "./constants.js"
import exp from "express"

dns.setServers(["8.8.8.8", "1.1.1.1"]) // 

const app = exp()
// JavaScript IIFE  a function you define and run right away. An IIFE runs immediately when JavaScript reaches it.
// always use semicolon before iffy protects the IIFE from accidentally joining the previous line if that line has no semicolon
;(async()=>{
   try{
   const connectionInstance = await mango.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)//execution of the IIFE stops at await mango.connect(...) until the connection attempt finishes.
   console.log(`\n MongoDB connected !! DB HOST :${connectionInstance.connection.host }`)


   const server = app.listen(process.env.PORT, ()=>{
      console.log(`listening at ${process.env.PORT}`)
   })

   server.on("error",(err)=>{
    console.log("ERROR of express: ",err)
    process.exit(1)
   })

   }catch(err){
    console.log("Error of mongo:",err)
    process.exit(1)
   }
})()