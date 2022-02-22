import React, { useState, useEffect } from "react";
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Button, Grid } from "@mui/material";
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
            if (user_find !== null && type=="Buyer") {

                const newUser = { email: user_find.email };
                poster
                    .post("/Order/getallorders", newUser)
                    .then((response) => {
                        // setFoodItems(response.data)
                        // console.log(response.data.allOrders)

                        setOrders(response.data.allOrders)

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
                    </Grid> </Item> </div>);
        }
        catch (error) {
            console.log(error);
        }
    }
    const onSubmitButton = (order) => {
        const newUser = { status: "COMPLETED", id: order._id };
        poster
            .post("/Order/updatestatus", newUser)
            .then((response) => {
                try {
                    console.log(response.data);
                    navigate("/rating",{ state: {id:order._id } })
                }
                catch (err) {
                    return response.status(201).json({ Error: err })
                }
            });
    }
    const displayButton = (order) => {
        if (order.status === "PICKUP") {
            return (
                <div>
                    <Button onClick={() => onSubmitButton(order)}>
                        Picked Up
                    </Button>
                </div>
            )
        }
        else {
            return (<></>);
        }

    }
    const displayOrderItems = (order, index) => {
        try {
            return (
                <Grid item xs>
                    {/* <p>{`Email: `}{order.email} </p> */}
                    <Item>{`Order Time: `}{order.time} </Item>
                    <Item>{`Price: `}{order.price} </Item>
                    <Item>{`Status: `}{order.status} </Item>
                    <Item> {` Canteen: ${orders[index].canteen}`}
                    </Item>
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
                        {displayButton(order)}
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

                {orders.map((order, idx) => (
                    <div>
                        {displayOrderItems(order, idx)}
                    </div>
                ))
                }
            </Grid>
        </div>
    );
};
export default ViewOrder;