import React, { useState, useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import poster from "../../com_env"
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import emailjs from 'emailjs-com';

const commonStyles = {
    bgcolor: 'background.paper',
    m: 1,
    border: 1,
    width: '12rem',
    height: '30rem',
};

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const ViewFood = () => {
    const navigate = useNavigate();

    var user = JSON.parse(window.sessionStorage.getItem("user"));
    var type=window.sessionStorage.getItem("type");

    const [food_items, setFoodItems] = useState([]);

    useEffect(() => {
        async function abc() {
            if (user !== null && type=="Vendor") {
                const getFood = {

                    canteen: user.ShopName
                }
                poster
                    .post("/Vendor/getfood", getFood)
                    .then((response) => {
                        setFoodItems(response.data.fooditems);
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
    });
    const sendEmailAccepted = (e,email,status) => {
        e.preventDefault();    //This is important, i'm not sure why, but the email won't send without it
        console.log(email);

        emailjs.send('gmail', 'template_sjbz16f', { canteen: user.ShopName ,email:email,status:status}, 'user_Cdt5nq4GxlcqCsEOpKgyu')
            .then((result) => {
                console.log(result)  //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior) 
            }, (error) => {
                console.log(error.text);
            });
    };
     function onReject  (e,order)  {
        if (order.status == "REJECTED" || order.status == "COMPLETED") {
console.log(order.status);
        }
        else {
            sendEmailAccepted(e,order.email,"Rejected");

            const newUser = { status: "REJECTED", id: order._id };
            const newEater = { name: order.email }
            var wallet=0;
            var x;
          poster
                .post("/Buyer/viewprofile", newEater)
                .then((response) => {
                    try {
                          x = response.data;
                         wallet = x.wallet + order.price;

                        // console.log("1");
                        const newWallet = {
                            email: x.email,
                            money: wallet
                        }
                 poster
                        .post("/Buyer/increasemoney", newWallet)
                        .then((res) => {
                            try{
                             poster
                            .post("/Order/updatestatus", newUser)
                            .then((res) => {
                                return res.status(200).end()
                            });
                                    
                        }

                            catch (error) {
                            console.log(error.message);
                        }
                        
                        });
                
                        // return response.status(200).end()
                    }
                    catch (err) {

                        return response.status(201).end()
                    }
                }
                );
           

        }
    };
    var canteen = user.ShopName;
    var vname = user.name;
     function onDelete(e,name, canteen) {
        try {
            const delFood = {
                name: name,
                canteen: canteen
            }
   poster
                .post("/Order/ondeletefood", delFood)
                .then((response) => {
                    var x=response.data;
                    for(var i=0;i<x.length;i++)
                    {
                        onReject(e,x[i]);
                    }
                     poster
                    .post("/Vendor/deletefood", delFood)
                    .then((response) => {
                        alert("Deleted\t");
                        // console.log("4");
                    });
                });
          
            // window.location.reload(false);

        }
        catch (error) {
            console.log(error.message);
        }
    };
    const editFood= (foodName, canteen,index) =>{
    //     const getFood = {
    //         name: foodName,
    //         canteen: canteen
    //   }
    // await    poster
    //         .post("/Vendor/getfooditemforedit", getFood)
    //         .then((response) => {
    //             // setFoodItems(response.data.fooditems);

    //         });

            navigate('/editFood', { state: { canteen: canteen, name: foodName, price: food_items[index].price, addon: food_items[index].addOns, tags: food_items[index].tags } });


    }

    async function onSubmit() {

        navigate("/addfood");
    };

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
                    <p>{`Addon ${index + 1}: `}{addon.name}{" ,Price: Rs "}{addon.price}</p>
                </div>
            );
        }
        catch (error) {
            console.log(error);
        }
    };

    const displayFoodItem = (foodItem, index) => {
        try {
            return (

                <Item><p>{`Food Name ${index + 1}: `}{foodItem.name} </p>
                    <p>{`Price: Rs `}{foodItem.price}</p>
                    <p>{`Canteen: `}{foodItem.canteen} </p>
                    <p>{`Rating: `} {Math.round(foodItem.rating * 10) / 10} {`/5`} </p>
                    <p>{foodItem.veg}</p>
                    <div>
                        {foodItem.tags.map((tag, idx) => (
                            <div>
                                {displayTags(tag, idx)}
                            </div>
                        ))

                        }
                    </div>
                    <div>
                        {foodItem.addOns.map((addon, idx) => (
                            <div>
                                {displayAddOns(addon, idx)}
                            </div>
                        ))

                        }
                    </div>
                    <Button onClick={(e) => onDelete(e,foodItem.name, user.ShopName)}>Delete</Button>
                    <div><a href="" onClick={() => { editFood(foodItem.name, user.ShopName,index) }}>Edit Food</a></div>
                    {/* https://mui.com/components/menus/
              */}
                </Item>
            );
        }
        catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <Grid container justifyContent="flex-end">

                <Button variant="contained" size="large" onClick={() => onSubmit()}>Add Food Item</Button>
            </Grid>

            <div>
                <Grid item xs>

                    {
                        food_items.map((foodItem, idx) => (
                            <Item>
                                {displayFoodItem(foodItem, idx)}
                            </Item>
                        ))
                    }
                </Grid>
            </div>



        </div>
    );
    //};
};
export default ViewFood;
