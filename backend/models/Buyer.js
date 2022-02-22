import mongoose from "mongoose"
const Schema = mongoose.Schema;

// Create Schema
const BuyerSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	contact:{
		type:String,
		required:true
	},
	age:{
		type:String,
		required:true
	},
	batchName:{
		type:String,
		required:true
	},
	pass:{
		type:String,
		required:true
	},
	wallet:{
		type: Number,
		default:0
	}
});
const User = mongoose.model("buyers", BuyerSchema);
export default User;