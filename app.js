require('dotenv').config()
require('express-async-errors')
const express=require('express')
const app=express()

const connectDB=require('./db/connect')
const productsRouter=require('./routes/products')
//middlewares
const notFoundMiddleware=require('./middleware/not-found')
const errorMiddleware=require('./middleware/error-handler')
app.use(express.json())
app.use('/api/v1/products',productsRouter)

app.use(notFoundMiddleware)
app.use(errorMiddleware)
const PORT=process.env.PORT||3000

//routes
app.get('/',(req,res)=>{
    res.send('<h1>Store api</h1><a href="/api/v1/products">products route</a>')
})

const start=async()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT,()=>{
            console.log('server is listening')
        })
    }catch(error){
console.log(error)
    }
}

start()


