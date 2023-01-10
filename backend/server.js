import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import 'express-async-errors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'

//DB
import connectDB from './db/connect.js'


//route
import authRouter from './routes/authRoute.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/ProductRoute.js'
import reviewRouter from './routes/reviewRoute.js'
import orderRouter from './routes/orderRoute.js'
import stripeRouter from './routes/stripeRoute.js'



//middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/errorHandler.js'


if(process.env.NODE_ENV !=='production'){
    app.use(morgan('dev'))
}



app.get('/',(req,res)=>{
    res.send('Welcome page')
    
})

app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))

app.use(express.static('./public'));
app.use(fileUpload());

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/users',userRouter)
app.use('/api/v1/products',productRouter)
app.use('/api/v1/reviews',reviewRouter)
app.use('/api/v1/orders',orderRouter)
app.use('/api/v1/stripe',stripeRouter)




app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)



const port=process.env.PORT || 5000;



const start=async()=>{
    try{
            await connectDB(process.env.MONGO_URL)
            app.listen(port,()=>console.log(`the server is running on ${port}`))
    }catch(error){
        console.log(error)
    }
}

start()