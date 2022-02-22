import mongoose from "mongoose"
const Schema = mongoose.Schema;

// Create Schema
const VendorSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	contact:{
		type:Number,
		required:true
	},
	ShopName:{
        type:String,
        required:true
    },
    OpeningDate:{
        type:String,
        required:true
    },
    ClosingDate:{
        type:String,
        required:true
    },
    pass:{
		type:String,
		required:true
	}
});

const User = mongoose.model("vendors", VendorSchema);
export default User;