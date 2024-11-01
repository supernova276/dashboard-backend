import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import clientRoutes from './src/routes/client.js'
import generalRoutes from './src/routes/general.js'
import managementRoutes from './src/routes/management.js'
import salesRoutes from './src/routes/sales.js'


// config
dotenv.config()
const app=express()
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

// routes
app.use("/client",clientRoutes)
app.use("/management",managementRoutes)
app.use("/sales",salesRoutes)
app.use("/general",generalRoutes)

const PORT=process.env.PORT | 3000
let MONGO_URL=process.env.MONGO_URL

let MONGO_PASSWORD=process.env.MONGO_PASSWORD
const indexOfPass=MONGO_URL.indexOf('4')

if(indexOfPass !==-1){

    console.log("index",indexOfPass)
    console.log("password",MONGO_PASSWORD)
    MONGO_URL=MONGO_URL.slice(0,indexOfPass)+encodeURIComponent(MONGO_PASSWORD)+MONGO_URL.slice(indexOfPass+15)
    console.log(MONGO_URL)
}
mongoose.connect(MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    }
).then(()=>{

    app.listen(PORT, ()=>{console.log("port connected successfuly")})

}).catch((error)=>{
    console.log("error",error)
})

