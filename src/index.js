//require('dotenv').config({path:'./env'})
import dotenv from "dotenv"
import connectDB from "./db/db.js"


dotenv.config({
    path:'./env'
})


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`server is ruuning ar ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("mongo db connection failed : ",err)
})