import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from "axios"
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ButtonGroup from '@mui/material/ButtonGroup';
import http from "../../com_env"
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const MakeOrder = () => {
    const navigate = useNavigate();
    const location = useLocation();

    var user_find = JSON.parse(window.sessionStorage.getItem("user"));
    const name = location.state.name;
    const canteen = location.state.canteen;
    const [foodPrice, setFoodPrice] = useState(0);
    const useMountEffect = (fun) => useEffect(fun, [])

    const [foodItem, setFoodItem] = useState({});
    const [wallet, setWallet] = useState(0);
    const [addons, setAddOns] = useState([]);
    const [tags, setTags] = useState([]);
    const [rating, setRating] = useState(0)
    const [veg,setVeg]=useState("Veg")
    var type = window.sessionStorage.getItem("type");

    useEffect(() => {

        async function abc() {
            if (user_find !== null && type == "Buyer") {

            }
            else {
                return (<div>
                    {alert("Pls login First")}
                    {navigate("/login")};
                </div>
                );
            }

        }
        abc()
    })

    async function abcd() {

        if (user_find !== null && type == "Buyer") {
            await http
                .post("/Vendor/getfooditemforedit", { canteen: canteen, name: name })
                .then((response) => {
                    var x = response.data.fooditems[0];
                    setFoodPrice(x.price);
                    setTags(x.tags);
                    setRating(x.rating);
                    setVeg(x.veg)
                    setFoodItem({ name: x.name, price: x.price, quantity: 0 });
                    var addons_util = [];
                    for (var i = 0; i < x.addOns.length; i++) {
                        addons_util.push({ name: x.addOns[i].name, price: x.addOns[i].price, quantity: 0, foodName: x.name });
                    }
                    setAddOns(addons_util)
                });
                http
                .post("/Buyer/viewprofile",{name:user_find.email})
                .then((response) => {
                
                                setWallet(response.data.wallet);
                })
        }
        else {
            return (<div>
                {alert("Pls login First")}
                {navigate("/login")};
            </div>
            );
        }
    }
    useMountEffect(abcd)

    const displayTags = (tag, index) => {

        try {
            if (tag.name.length === 0) return;
            return (
                <div>
                    <p>
                        {`Tag ${index + 1}: `} {tag.name}
                    </p>
                </div>
            );
        }
        catch (error) {
            console.log(error)
        }
    };
    const displayAddOns = (addon, index) => {
        try {
            if (addon.name.length === 0) return;
            return (
                <div>
                    <ButtonGroup size="small" >

                        <Button
                            aria-label="reduce"
                            onClick={(e) => { addons[index].quantity = Math.max(addons[index].quantity - 1, 0); setAddOns([...addons]); }}
                        >
                            <RemoveIcon fontSize="small" />
                        </Button>
                        <Button
                            aria-label="increase"
                            onClick={(e) => { addons[index].quantity = Math.min(addons[index].quantity + 1, 1); setAddOns([...addons]) }}
                        >
                            <AddIcon fontSize="small" />
                        </Button>

                        <TextField
                            id="outlined-required"
                            label={`Addon ${index + 1}: ${addon.name} ,Price: Rs ${addon.price}`}
                            defaultValue={0}
                            value={addon.quantity}
                            size="small"
                        />                        </ButtonGroup>


                </div>
            );
        }
        catch (error) {
            console.log(error);
        }
    };

    const finalOrder = () => {
        var x = [];
        var price = 0;
        var foodItems = [foodItem];
        var addons_util = [];
        for (var i = 0; i < addons.length; i++) {
            if (addons[i].quantity > 0) {
                addons_util.push(addons[i]);
                price += addons[i].price;
            }
        }
        price += foodItem.quantity * foodItem.price;
        var wallet_money=wallet;
        if (wallet >= price && foodItem.quantity != 0) {
            wallet_money-=price;
            setWallet(wallet_money);
            const newFood = {
                email: user_find.email,
                money: wallet_money
            }
            http
                .post("/Buyer/increasemoney", newFood)
        }
        else if (foodItem.quantity == 0) {
            alert("Please Place an order");
            return;
        }
        else {
            alert("Not enough Money" );
            return;
        }
        var date = new Date;
        var time = date.getHours() + ":" + date.getMinutes();
        const newOrder = {
            email: user_find.email,
            time: time,
            addons: addons_util,
            food: foodItems,
            price: price,
            canteen: canteen
        };
 http
            .post("/Order/addorder", newOrder)
            .then((response) => {
                console.log(response.data);
                navigate("/bvieworder")

            });
        }
    return (<div>
        <Grid container justifyContent="flex-end">
            Wallet: {wallet}
        </Grid>
        <Item>

            <Grid container justifyContent="flex-end">
                <ButtonGroup size="small" >

                    <Button
                        aria-label="reduce"
                        onClick={(e) => { foodItem.quantity = Math.max(foodItem.quantity - 1, 0); setFoodItem({ ...foodItem }); }}
                    >
                        <RemoveIcon fontSize="small" />
                    </Button>
                    <Button
                        aria-label="increase"
                        onClick={(e) => { foodItem.quantity += 1; setFoodItem(foodItem); setFoodItem({ ...foodItem }); }}
                    >
                        <AddIcon fontSize="small" />
                    </Button>

                    <TextField
                        id="outlined-required"
                        label="Order"
                        defaultValue={0}
                        value={foodItem.quantity}
                        size="small"
                    />                        </ButtonGroup>

            </Grid>

            <p>{`Food Name ${foodItem.name} `}</p>
            <p>{`Price: Rs `}{foodItem.price}</p>
            <p>{`Canteen: `}{canteen} </p>
            <p>{`Rating: `} {Math.round(rating * 10) / 10} {`/5`} </p>
            <p>{`Veg: `}{veg} </p>

            <div>
                {tags.map((tag, idx) => (
                    <div>
                        {displayTags(tag, idx)}
                    </div>
                ))

                }
            </div>
            <div>
                {addons.map((addon, idx) => (
                    <div>
                        {displayAddOns(addon, idx)}
                    </div>
                ))

                }
            </div>

            <div>
                <Button onClick={() => { finalOrder() }}> Place Order </Button>
            </div>
        </Item>    </div>)
};

export default MakeOrder;