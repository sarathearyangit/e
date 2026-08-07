import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import itemRouter from "./routes/itemRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config.js'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import wishlistRouter from "./routes/wishlistRoute.js"
 

//app config
const app = express()
const port = process.env.PORT || 5000

//middleware
app.use(express.json())
app.use(cors())

//db connection
connectDB()


//api endpoints
app.use('/api/item',itemRouter)
app.use('/images',express.static('uploads'))
app.use('/api/user',userRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.use('/api/wishlist',wishlistRouter)



app.get('/',(req,res) => {
    res.send("Api Working")
})

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)
})

