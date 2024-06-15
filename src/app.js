import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"



const app=express()

app.use(cors(
    {
        origin:process.env.CORS_ORIGIN,
        credentials:true
    }
))
app.use(express.json())//for accepting the json
app.use(express.urlencoded({extended:true}))// for accepting the data from url
app.use(express.static("public"))// file folder server me rkhna chahta hu to public asset bna dete hai
app.use(cookieParser())

//routes import

import userRouter from "./routes/user.routes.js"



//routes declaration
app.use("/api/v1/users",userRouter)
    


export {app}