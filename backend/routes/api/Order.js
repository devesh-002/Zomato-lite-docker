import { addOrder ,getAllOrders,OnDeleteFood} from "../controllers/Buyer.js";
import { getAllVendorOrders ,updateOrder} from "../controllers/Vendor.js";
import express from "express";
var router = express.Router();
// Load User model
import Order from "../../models/Order.js"
router.get("/", function (req, res) {
	Order.find(function (err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})

});
router.post("/addorder",addOrder);
router.post("/getallorders",getAllOrders);
router.post("/getvendororders",getAllVendorOrders);
router.post("/updatestatus",updateOrder);
router.post("/ondeletefood",OnDeleteFood);
export default router;
