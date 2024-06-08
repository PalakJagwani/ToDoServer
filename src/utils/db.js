import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()


const connectDb = () => {
    const mongoUri = process.env.MONGODBURI;
    mongoose.connect(mongoUri, {useNewUrlParser : true})

    mongoose.connection.on('connected', ()=>{
        console.log("DataBase connected successfully")
    })

    mongoose.connection.on('disconnected', () => {
        console.log("DataBase Disconnected")
    })

    mongoose.connection.on('error', (error)=>{
        console.log("Error while connecting to database", error.message);
    })
}

export default connectDb;