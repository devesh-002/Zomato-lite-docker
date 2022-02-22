import mongoose from "mongoose"
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        
        time: {
            type: String,
            required: true
        },
        foodItem: [{
            name: String,
            price: Number,
            quantity: Number,
        }],
        canteen: {type: String,required:true}
,
        addOns: [{
            name: String,
            foodName: String,
            price: Number,
            quantity: Number
        }],
        price: {
            type: Number
        },
        status: {
            type: String,
            default: "PLACED"
        }

    }
);
// console.log("ok")
const OrderModel = mongoose.model('orders', OrderSchema);
export default OrderModel;