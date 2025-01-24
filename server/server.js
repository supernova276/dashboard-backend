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
import authRoutes from './src/routes/auth.js'
import overallStats from './src/models/overallStats.model.js'

// import


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
app.use("/auth",authRoutes)

const PORT=process.env.PORT || 3000
let MONGO_URL=process.env.MONGO_URL

mongoose.connect(MONGO_URL).then(()=>{

    app.listen(PORT,"0.0.0.0",()=>{
        console.log(`your app is running on port ${PORT}`)
    })

}).catch((error)=>{
    console.log("error",error)
})


app.get('/', (req, res) => {
    res.send('Server is working');
});

