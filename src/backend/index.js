import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import AuthRouter from './Routes/Auth.js'
import ProductRouter from './Routes/Products.js'
import CatgeoryRouter from './Routes/Categories.js'
import dashRouter from './Routes/Dashboard.js'
import mongoose from 'mongoose'
dotenv.config()
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const loc = path.join(__dirname , './uploads')

const app = express()
app.use('/images' , express.static(loc))
app.use(cors())
app.use(express.json())

app.use('/auth',AuthRouter)
app.use('/Products',ProductRouter)
app.use('/Category',CatgeoryRouter)
app.use('/Category',CatgeoryRouter)
app.use('/Dashboard',dashRouter)

mongoose.connect('mongodb://127.0.0.1:27017/homely').then(()=>{console.log('mongodb connected')}).catch(err=>console.log(err))

app.listen(process.env.PORT,()=>{
    console.log('Server Listening')
})