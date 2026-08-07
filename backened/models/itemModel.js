import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: {type:String,required:true},
    description: {type:String,required:true},
    price: {type:Number,required:true},
    oldprice: { type: Number, required:true},
    image: {type:String,required:true},
    category: {type:String,required:true},
    onSale: { type: Boolean, default: false },
    newArrival: { type: Boolean, default: false },
})

const itemModel = mongoose.models.item || mongoose.model("item",itemSchema)

export default itemModel