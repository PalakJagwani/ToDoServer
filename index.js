import express from 'express'
import dotenv from 'dotenv'
import ConnectDb from './src/utils/db.js'
import cors from 'cors'
import Routes from './src/routes/TodoRoutes.js'
import bodyParser from 'body-parser'
import UserRoutes from './src/routes/UserRoutes.js'

const app = express()
dotenv.config({path : './.env'})

const allowedOrigin = 'https://to-do-client-ten.vercel.app'

const corsOptions = {
    origin: allowedOrigin
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json({extended:true}))
//parse json first and then do routing
app.use('/', Routes)
app.use('/', UserRoutes)

ConnectDb()
app.listen(process.env.PORT, ()=>{
    console.log("Running on port " + process.env.PORT)
})