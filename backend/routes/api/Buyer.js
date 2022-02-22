import { loginBuyer, registerBuyer, EditBuyerProfile, getAllFood,getWallet ,updWallet,addOrder,viewProfile,updRating} from "../controllers/Buyer.js";

import express from "express";
var router = express.Router();
// Load User model
import User from "../../models/Buyer.js";
import Food from "../../models/Food.js"
router.get("/", function (req, res) {
	User.find(function (err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})

});

router.post("/register", registerBuyer)

router.post("/login", loginBuyer);
router.post("/editbuyer", EditBuyerProfile)
router.post("/getallfood", getAllFood);
router.post("/getwallet",getWallet);
router.post("/increasemoney",updWallet)
router.post("/viewprofile",viewProfile);
router.post("/rating",updRating);
export default router;

