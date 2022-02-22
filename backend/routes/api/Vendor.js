import { registerVendor,loginVendor,addFoodItem,EditVendorProfile,getFoodItems,getFoodItemForEdit,editFoodItem,deleteFoodItem,viewProfile,viewProfileThroughCanteen} from "../controllers/Vendor.js";

import express from "express";
var router = express.Router();
// Load User model
import User from "../../models/Vendor.js";

// GET request 
// Getting all the users
router.get("/", function(req, res) {
    User.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})

});
router.post("/register", registerVendor);
router.post("/login", loginVendor);
router.post("/addfood",addFoodItem);
router.post("/editvendor",EditVendorProfile);
router.post("/getfood",getFoodItems);
router.post("/getfooditemforedit",getFoodItemForEdit)
router.post("/editfood",editFoodItem);
router.post("/deletefood",deleteFoodItem);
router.post("/viewprofile",viewProfile);
router.post("/viewprofilecanteen",viewProfileThroughCanteen);
export default router;
