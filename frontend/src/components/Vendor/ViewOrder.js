import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Button, Grid } from "@mui/material";
import emailjs from 'emailjs-com';
import poster from "../../com_env"
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
const ViewOrder = () => {
    var user_find = JSON.parse(window.sessionStorage.getItem("user"));
    const navigate = useNavigate();
    var type=window.sessionStorage.getItem("type");

    const [user, setUser] = useState("")
    const [orders, setOrders] = useState([]);
    useEffect(() => {

        async function abc() {
            if (user_find !== null && type=="Vendor") {

                const newUser = { canteen: user_find.ShopName };
                poster
                    .post("/Order/getvendororders", newUser)
                    .then((response) => {
                        setOrders(response.data)
                    });
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
    const sendEmail = (e,email) => {
        e.preventDefault();    //This is important, i'm not sure why, but the email won't send without it
        console.log(email);

        emailjs.send('gmail', 'template_e8w858k', { canteen: user_find.ShopName ,email:email}, 'user_Cdt5nq4GxlcqCsEOpKgyu')
            .then((result) => {
                console.log(result)  //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior) 
            }, (error) => {
                console.log(error.text);
            });
    };
    const sendEmailAccepted = (e,email,status) => {
        e.preventDefault();    //This is important, i'm not sure why, but the email won't send without it
        console.log(email);

        emailjs.send('gmail', 'template_sjbz16f', { canteen: user_find.ShopName ,email:email,status:status}, 'user_Cdt5nq4GxlcqCsEOpKgyu')
            .then((result) => {
                console.log(result)  //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior) 
            }, (error) => {
                console.log(error.text);
            });
    };
    const displayaddon = (addon, index) => {
        try {
            return (<Item><Grid>
                {`Addon ${index + 1}: `}{addon.name}
            </Grid><Grid>
                    {" ,Price: Rs "}{addon.price}
                </Grid><Grid>
                    {"Quantity: "}{addon.quantity} </Grid>
            </Item>);
        }
        catch (error) {
            console.log(error);
        }
    }
    const displayOrderFoodItems = (foodItem, index) => {
        try {
            return (<div>
                <Item>  {`Food Item ${index + 1}: ${foodItem.name} `}
                    <Grid>
                        {`   Priced Rs: ${foodItem.price} `}
                    </Grid><Grid>

                        {`Quantity: ${foodItem.quantity}`}
                    </Grid> </Item>

            </div>);
        }
        catch (error) {
            console.log(error);
        }
    }
    const onSubmit = (e,idx) => {
        if (orders[idx].status == "PLACED") {
            var countOrders = 0;
            for (var i = 0; i < orders.length; i++) {
                if (orders[i].status == "ACCEPTED" || orders[i].status == "COOKING") {
                    countOrders++;
                }

            }
            console.log(countOrders)
            if (countOrders >= 10) {
                alert("There are already 10 orders in Progress");
                return;
            }
        }
        var order = orders[idx];
        var status = "";
        if (order.status === "PLACED") {
            status = "ACCEPTED";
            sendEmailAccepted(e,order.email,"Accepted");

        }
        else if (order.status === "ACCEPTED") {
            status = "COOKING";
        }
        else if (order.status === "COOKING") {
            status = "PICKUP";
            sendEmail(e,order.email);
        }

        if (status != "") {
            const newUser = { status: status, id: order._id };
            poster
                .post("/Order/updatestatus", newUser)
                .then((response) => {
                    try {
                        // console.log(response.data)
                        return response.status(200)
                    }
                    catch (err) {
                        return response.status(201).json({ Error: err })
                    }
                });
        }
        else {
            alert("Status cannot be moved");
            return;
        }
    }
    const onReject = (e,order) => {
        if (order.status == "REJECTED" || order.status == "COMPLETED") {
            alert("Will not work");

        }
        else {
            sendEmailAccepted(e,order.email,"Rejected");

            const newUser = { status: "REJECTED", id: order._id };
            const newEater = { name: order.email }
            poster
                .post("/Buyer/viewprofile", newEater)
                .then((response) => {
                    try {
                        var x = response.data;
                        var wallet = x.wallet + order.price;

                        console.log(x.wallet);
                        try {
                            const newWallet = {
                                email: x.email,
                                money: wallet
                            }
                            poster
                                .post("/Buyer/increasemoney", newWallet)
                                .then((res) => {
                                    alert("Added");
                                    console.log(res.data)
                                });
                        }
                        catch (error) {
                            console.log(error.message);
                        }
                        return response.status(200)
                    }
                    catch (err) {

                        return response.status(201).end()
                    }
                });
            poster
                .post("/Order/updatestatus", newUser)
                .then((res) => {
                    return res.status(200).end()
                });


        }
    };
    const displayOrderItems = (order, index) => {
        try {
            return (
                <Grid item xs>
                    {/* <p>{`Email: `}{order.email} </p> */}
                    <Item>{`Order Time: `}{order.time} </Item>
                    <Item>{`Price: `}{order.price} </Item>
                    <Item>{`Status: `}{order.status} </Item>
                    <Item>{`Canteen: ${order.canteen}`} </Item>
                    <div>
                        {order.foodItem.map((foodItemSingle, idx) => (
                            <div>
                                {/* {console.log(foodItemSingle)} */}
                                {displayOrderFoodItems(foodItemSingle, idx)}
                            </div>
                        ))

                        }
                    </div>
                    <div>
                        {order.addOns.map((addon, idx) => (
                            <div>
                                {displayaddon(addon, idx)}
                            </div>
                        ))

                        }
                    </div>
                    <Item>
                        <Button onClick={(e) => onSubmit(e,index)}>
                            MOVE TO NEXT STAGE                        </Button>
                    </Item>
                    <Item>
                        <Button onClick={(e) => onReject(e,order)}>
                            Reject
                        </Button>
                    </Item>
                </Grid>
            );
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="center">

                {

                    orders.map((order, idx) => (
                        <div>
                            {displayOrderItems(order, idx)}
                        </div>
                    ))
                }
            </Grid>
        </div>
    );
}
export default ViewOrder;