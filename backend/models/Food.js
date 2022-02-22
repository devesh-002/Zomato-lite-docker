import mongoose from "mongoose"
const Schema = mongoose.Schema;

const FoodSchema=new Schema({
    name: {
		type: String,
		required: true
	},
    price:{
        type:Number,
        required:true
    },
    canteen:{
        type:String,
        required:true
    },
    rating:{
        type : Number,
        default:0
    },
    rating_util:{
        type:Number,
        default:0
    },
    addOns:[{
      name:String,
      price:Number
    }],
    tags:[{
        name:String
    }],
    veg:{
        type:String,
        default:"Veg"
    }
});
const UserModel = mongoose.model('foods', FoodSchema);
export default UserModel;