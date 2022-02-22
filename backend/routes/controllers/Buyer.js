import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
import validator from 'validator'
import Buyer from "../../models/Buyer.js";
import Order from "../../models/Order.js"
import isEmpty from 'is-empty'
// dotenv.config();
// const keys = process.env
import Food from "../../models/Food.js"
export const registerBuyer = async (req, res) => {
    try {
        var errors = {}
        var bname = req.body.name;
        var email = req.body.email;
        var pass = req.body.pass;
        var conf_pass = req.body.confpass;
        var contact = req.body.contact;
        var age = req.body.age;
        var batchName = req.body.batchName;
        var validator_name = !isEmpty(bname) ? bname : "";
        var validator_email = !isEmpty(email) ? email : "";
        var validator_pass = !isEmpty(pass) ? pass : "";
        var validator_conf_pass = !isEmpty(conf_pass) ? conf_pass : "";
        var validator_age = !isEmpty(age) ? age : "";

        var validator_contact = !isEmpty(contact) ? contact : "";
        var isContact = /^\d+$/.test(contact);
        var isAge = /^\d+$/.test(age);
        if (validator.isEmpty(validator_age)) {
            errors.age = "Age is Empty"
        }
        else if (!isAge) {
            errors.age = "Enter Numeric value only";
        }
        else if (age > 120) {
            errors.age = "Enter valid age"
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
        const user_checker = await Buyer.findOne({ email });
        if (user_checker) {
            return res.status(201).json({ email: "Email already exists" });
        }
        const newBuyer = new Buyer(
            {
                name: bname,
                email: email,
                pass: pass,
                contact: contact,
                age: age,
                batchName: batchName
            }
        );
        bcrypt.hash(newBuyer.pass, 10, (err, hash) => {
            if (err) throw err;
            newBuyer.pass = hash;
            newBuyer.save()
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

export const loginBuyer = async (req, res) => {
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
        const user = await Buyer.findOne({ email });
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
        console.log("Buyer logged in");
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



export const EditBuyerProfile = async (req, res) => {
    try {
        var errors = {}
        const name = req.body.name;
        const contact = req.body.contact;
        const email = req.body.email;
        const age = req.body.age;
        const batchName = req.body.batchName;
        var validator_age = !isEmpty(age) ? age : "";
        var isAge = /^\d+$/.test(age);
        if (validator.isEmpty(validator_age)) {
            errors.age = "Age is Empty"
        }
        else if (!isAge) {
            errors.age = "Enter Numeric value only";
        }
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
        const updateRes = await Buyer.findOneAndUpdate({ email: email }, { name: name, contact: contact, age: age, batchName: batchName },
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

export const getAllFood = async (req, res) => {
    try {
        const foodItems = await Food.find();
        return res.status(200).json(foodItems);
    }
    catch (error) {
        return res.status(201).json({ someError: error.message });
    }
};
export const getWallet = async (req, res) => {
    try {
        var email = req.body.email;
        const foodItem = await Buyer.findOne({ email: email });
        return res.status(200).json(foodItem);
    }
    catch (error) {
        return res.status(201).json({ someError: error.message });
    }
};
export const updWallet = async (req, res) => {
    try {
        var email = req.body.email;
        var moneyAdd = req.body.money;
        var isAge = /^\d+$/.test(moneyAdd);
        if (!isAge) {
            console.log(moneyAdd)
            return res.status(201).json({ someError: "Wallet Money should be Numeric" });
        }

        const foodItem = await Buyer.findOneAndUpdate({ email: email }, { wallet: moneyAdd })
        const Name = await Buyer.findOne({ email: email });
        return res.status(200).json(Name);
    }
    catch (error) {
        return res.status(201).json({ someError: error.message });
    }
}
export const addOrder = async (req, res) => {
    try {
        var time = req.body.time;
        var addons = req.body.addons;
        var price = req.body.price;
        var food = req.body.food;
        var email = req.body.email;
        var canteen = req.body.canteen;
        const newOrder = new Order(
            {
                price: price,
                time: time,
                foodItem: food,
                addOns: addons,
                email: email,
                canteen: canteen
            }
        );
        console.log(newOrder)
        newOrder.save()
            .then(user_checker => {
                res.status(200).json(user_checker);
                console.log(user_checker)
            })
            .catch(err => {
                res.status(400).send(err);
            });

    }
    catch (error) {
        return res.status(201).json({ someError: error.message });
    }
}
export const getAllOrders = async (req, res) => {
    try {
        var email = req.body.email;
        const allOrders = await Order.find({ email: email })
        return res.status(200).json({ allOrders })

    }
    catch (error) {
        return res.status(201).json({ someError: error.message });
    }
}
export const viewProfile = async (req, res) => {
    try {
        var name = req.body.name;
        var foodItem = await Buyer.findOne({ email: name });
        return res.status(200).json(foodItem);
    }
    catch (error) {
        return res.status(201).json({ someError: error.message });
    }
}
export const updRating = async (req, res) => {
    try {
        var id = req.body.id;
        var sentRating = Number(req.body.rating);
        var item = await Order.findOne({ _id: id });
        var name = item.foodItem[0].name;
        var canteen = item.canteen;
        var foodItem = await Food.findOne({ name: name, canteen: canteen });
        var rating = Number(foodItem.rating);
        var rating_util = Number(foodItem.rating_util);
        console.log("sent Rating   ", sentRating)
        console.log(((rating * rating_util) + sentRating))

        rating = ((rating * rating_util) + sentRating) / (rating_util + 1);
        rating_util += 1;
        var final = await Food.findOneAndUpdate({ name: name, canteen: canteen }, { rating: rating, rating_util: rating_util });
        return res.status(200).json({ final });
    }

    catch (error) {
        return res.status(201).json({ someError: error.message });
    }
}

export const OnDeleteFood = async (req, res) => {
    try {
        var foodName = req.body.name;
        var canteen = req.body.canteen;
        var final = await Order.find({ canteen: canteen, "foodItem.name": foodName });
        console.log(final)
        return res.status(200).json(final)
    }

    catch (error) {
        return res.status(201).json({ someError: error.message });
    }
}