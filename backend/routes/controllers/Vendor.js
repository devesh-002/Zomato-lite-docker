import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from 'validator';
import Vendor from "../../models/Vendor.js";
import isEmpty from 'is-empty';
import Food from "../../models/Food.js";
import Order from "../../models/Order.js"
export const registerVendor = async (req, res) => {
    try {
        var errors = {}
        var vname = req.body.name;
        var email = req.body.email;
        var pass = req.body.pass;
        var conf_pass = req.body.confpass;
        var contact = req.body.contact;
        var shopName = req.body.shopName;
        var openTime = req.body.openTime;
        var closeTime = req.body.closeTime;
        var validator_name = !isEmpty(vname) ? vname : "";
        var validator_email = !isEmpty(email) ? email : "";
        var validator_pass = !isEmpty(pass) ? pass : "";
        var validator_conf_pass = !isEmpty(conf_pass) ? conf_pass : "";
        // var validator_name = !isEmpty(vname) ? vname : "";
        var validator_contact = !isEmpty(contact) ? contact : "";
        var isContact = /^\d+$/.test(contact);
        var validator_shopName=!isEmpty(shopName) ? shopName : "";
        if (validator.isEmpty(validator_shopName)) {
            errors.shopName = "Shop Name is Empty"
        }

        if (validator.isEmpty(validator_contact)) {
            errors.contact = "Contact is Empty"
        }

        else if (!isContact) {
            errors.contact = "Enter only numbers"
        }
        else if (!validator.isLength(validator_contact, { min: 10, max: 10 })) {
            errors.contact = "Length of Contact is 10"
        }

        if (validator.isEmpty(validator_name)) {
            errors.name = "Name field is compulsory"
        }

        if (validator.isEmpty(validator_email)) {
            errors.email = "Email field is compulsory"
        }
        else if (!validator.isEmail(validator_email)) {
            errors.email = "Email is invalid"
        }
        if (validator.isEmpty(validator_pass)) {
            errors.pass = "Password field is necessary"
        }
        else if (!validator.isLength(validator_pass, { min: 6, max: 50 })) {
            errors.pass = "Password must be atleast 6 characters and max 50 characters"
        }
        if (!validator.equals(validator_pass, validator_conf_pass)) {
            errors.conf_pass = "Passwords do not match"
        }

        const checker = isEmpty(errors)
        if (!checker) {
            console.log(errors)
            return res.status(201).json(errors)
        }
        console.log("okok")
        const user_checker = await Vendor.findOne({ email });
        if (user_checker) {
            return res.status(201).json({ email: "Email already exists" });
        }
        const shop_checker = await Vendor.findOne({ shopName });
        if (shop_checker) {
            return res.status(201).json({ shopName: "Shop Name already exists" });

        }
        const newVendor = new Vendor(
            {
                name: vname,
                email: email,
                pass: pass,
                contact: contact,
                ShopName: shopName,
                OpeningDate: openTime,
                ClosingDate: closeTime
            });
        bcrypt.hash(newVendor.pass, 10, (err, hash) => {
            if (err) throw err;
            newVendor.pass = hash;
            newVendor.save()
                .then(user_checker => {
                    res.status(200).json(user_checker);
                })
                .catch(err => {
                    res.status(400).send(err);
                });
        });
    }
    catch (error) {
        return res.status(201).json({ someError: error.message });

    }
};


export const loginVendor = async (req, res) => {
    try {
        var errors = {}
        var email = req.body.email;
        var pass = req.body.pass;
        var validator_email = !isEmpty(email) ? email : "";
        var validator_pass = !isEmpty(pass) ? pass : "";
        if (validator.isEmpty(validator_email)) {
            errors.email = "Email field is compulsory"
        }
        else if (!validator.isEmail(validator_email)) {
            errors.email = "Email is invalid"
        }
        if (validator.isEmpty(validator_pass)) {
            errors.pass = "Password field is necessary"
        }
        else if (!validator.isLength(validator_pass, { min: 6, max: 50 })) {
            errors.pass = "Password must be atleast 6 characters and max 50 characters"
        }
        const user = await Vendor.findOne({ email });
        const checker = isEmpty(errors)
        if (!checker) {
            console.log(errors)
            return res.status(201).json(errors)
        }
        if (!user) {
            return res.status(201).json({ email: "Email not found" });
        }
        const pass_of_email = await bcrypt.compare(pass, user.pass);
        if (!pass_of_email) {
            return res.status(201).json({ pass: "Passwords do not match" });

        }
        console.log("Vendor logged in");
        // const payload = {
        //     id: user._id,
        //   };
        //   const token = jwt.sign(payload, keys.secretOrKey);
        return res.status(200).json(user);

    }
    catch (error) {
        return res.status(201).json({ someError: error.message });

    }
};

export const addFoodItem = async (req, res) => {
    try {
        var errors = {}
        var name = req.body.name;
        var price = req.body.price;
        var canteen = req.body.canteen;
        var addon = req.body.addon;
        var tags = req.body.tags;
        var validator_name = !isEmpty(name) ? name : "";
        var validator_canteen = !isEmpty(canteen) ? canteen : "";
        var veg = req.body.veg;
        if (validator.isEmpty(validator_name)) {
            errors.name = "Name field is compulsory"
        }
        if (validator.isEmpty(validator_canteen)) {
            errors.canteen = "Name field is compulsory"
        }
        if (price <= 0) {
            errors.price = "Price should be greater than 0"
        }
        for (var i = 0; i < addon.length; i++) {
            let add = addon[i];
            if (validator.isEmpty((!isEmpty(add.name) ? add.name : ""))) {
                errors.addon_name = "Add on Name is compulsory"
                break;
            }
            else if (addon.price === 0) {
                errors.addon_price = "Add on Price should be greater than 0"; break;
            }
        }

        for (var i = 0; i < tags.length; i++) {
            let tag = tags[i];
            if (validator.isEmpty((!isEmpty(tag.name) ? tag.name : ""))) {
                errors.tag = "Tag Name is complusory"
                break;
            }
        }
        const checker = isEmpty(errors)
        if (!checker) {
            console.log(errors)
            return res.status(201).json({ error: errors })
        }

        const canteen_checker = await Vendor.findOne({ ShopName: canteen });
        if (!canteen_checker) {
            return res.status(201).json({ canteen: "No such canteen exists" })
        }

        const user_checker = await Food.findOne({ name: name });
        console.log("yo")
        if (user_checker) {
            if (user_checker.canteen == canteen) {
                return res.status(201).json({ food: "Food already added" })
            }
        } console.log("Ok")

        const newFoodItem = new Food({
            name: name,
            price: price,
            canteen: canteen,
            addOns: addon,
            tags: tags,
            veg: veg
        });
        newFoodItem.save()
            .then(user_checker => {
                res.status(200).json(user_checker);
            })
            .catch(err => {
                res.status(400).send(err);
            });


    }
    catch (error) {
        return res.status(201).json({ someError: error.message });
    }
};

export const EditVendorProfile = async (req, res) => {
    try {
        var errors = {}
        const name = req.body.name;
        const contact = req.body.contact;
        const email = req.body.email;
        const openTime = req.body.openTime;
        const closeTime = req.body.closeTime;

        var validator_name = !isEmpty(name) ? name : "";
        var validator_name = !isEmpty(name) ? name : "";
        var validator_contact = !isEmpty(contact) ? contact : "";
        var isContact = /^\d+$/.test(contact);



        if (validator.isEmpty(validator_contact)) {
            errors.contact = "Contact is Empty"
        }

        else if (!isContact) {
            errors.contact = "Enter only numbers"
        }
        else if (!validator.isLength(validator_contact, { min: 10, max: 10 })) {
            errors.contact = "Length of Contact is 10"
        }

        if (validator.isEmpty(validator_name)) {
            errors.name = "Name field is compulsory"
        }
        const updateRes = await Vendor.findOneAndUpdate({ email: email }, { name: name, contact: contact, OpeningDate: openTime, ClosingDate: closeTime },
            function (err, doc) {
                if (err) { throw err; }
                else { console.log("Updated"); }
            });
        return res.status(200).json({ updateRes })

    }
    catch (error) {
        return res.status(201).json({ someError: error.message });
    }
};

export const DelFoodItem = async (req, res) => {
    try {
        const name = req.body.name;
        const canteen = req.body.canteen;
        const foodItem = await Food.findOne({ canteen: canteen, name: name });
        if (!foodItem) {
            return res.status(201).json({ error: "No such food item exists" });
        }
        // delete food orders as well, currently deleting only food item

        await Food.findOneAndDelete({ canteen: canteen, name: name });
        return res.status(200).json({ status: "Success" })
    }
    catch (error) {
        return res.status(201).json({ someError: error.message });

    }
};

export const getFoodItems = async (req, res) => {
    try {
        const canteen = req.body.canteen;
        const fooditems = await Food.find({ canteen: canteen })
        // console.log(fooditems)
        // console.log(canteen)
        return res.status(200).json({ fooditems })
    } catch (err) {
        return res.status(201).json({ someError: err.message })
    }
}
export const getFoodItemForEdit = async (req, res) => {
    try {
        const canteen = req.body.canteen;
        const foodName = req.body.name
        const fooditems = await Food.find({ canteen: canteen, name: foodName })

        return res.status(200).json({ fooditems: fooditems })
    } catch (err) {
        return res.status(201).json({ someError: err.message })
    }
}
export const editFoodItem = async (req, res) => {
    try {
        var errors = {}
        var name = req.body.name;
        var price = req.body.price;
        var canteen = req.body.canteen;
        var addon = req.body.addon;
        var tags = req.body.tags;
        var veg = req.body.veg;

        if (price <= 0) {
            errors.price = "Price should be greater than 0"
        }
        for (var i = 0; i < addon.length; i++) {
            let add = addon[i];
            if (validator.isEmpty((!isEmpty(add.name) ? add.name : ""))) {
                errors.addon_name = "Add on Name is compulsory"
                break;
            }
            else if (addon.price === 0) {
                errors.addon_price = "Add on Price should be greater than 0"; break;
            }
        }

        for (var i = 0; i < tags.length; i++) {
            let tag = tags[i];
            if (validator.isEmpty((!isEmpty(tag.name) ? tag.name : ""))) {
                errors.tag = "Tag Name is complusory"
                break;
            }
        }
        const checker = isEmpty(errors)
        if (!checker) {
            console.log(errors)
            return res.status(201).json({ error: errors })
        }
        const updateRes = await Food.findOneAndUpdate({ name: name, canteen: canteen }, { price: price, addOns: addon, tags: tags, veg: veg },
            function (err, doc) {
                if (err) { throw err; }
                else { console.log("Updated"); }
            });
        return res.status(200).json({ updateRes })

    }
    catch (err) {
        return res.status(201).json({ someError: err.message })
    }
}
export const deleteFoodItem = async (req, res) => {
    try {
        const canteen = req.body.canteen;
        const foodName = req.body.name
        const checker = await Food.findOneAndDelete({ canteen: canteen, name: foodName })
        //delete all orders as well
        return res.status(200).json({ success: "Success" })
    } catch (err) {
        return res.status(201).json({ someError: err.message })
    }
}

export const viewProfile = async (req, res) => {
    try {
        var name = req.body.name;
        var foodItem = await Vendor.findOne({ email: name });
        return res.status(200).json(foodItem);
    }
    catch (error) {
        return res.status(201).json({ someError: error.message });
    }
}
export const viewProfileThroughCanteen = async (req, res) => {
    try {
        var canteen = req.body.canteen;
        var foodItem = await Vendor.findOne({ ShopName: canteen });
        return res.status(200).json(foodItem);
    }
    catch (error) {
        return res.status(201).json({ someError: error.message });
    }
}
export const getAllVendorOrders = async (req, res) => {
    try {
        var canteen = req.body.canteen;
        var foodItems = await Order.find({ canteen: canteen });

        return res.status(200).json(foodItems)
    }

    catch (error) {
        return res.status(201).json({ someError: error.message });
    }
}
export const updateOrder = async (req, res) => {
    try {
        var id = req.body.id;
        var status = req.body.status;
        var variable = await Order.findOneAndUpdate({ _id: id }, { status: status });
        return res.status(200).json({ variable });
    }
    catch (error) {
        return res.status(201).json({ someError: error.message });
    }

}
