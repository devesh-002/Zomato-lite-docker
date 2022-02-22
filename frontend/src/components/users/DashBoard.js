import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Button, Grid } from "@mui/material";
import Box from '@mui/material/Box';

const ViewOrder = () => {
    var user_find = JSON.parse(window.sessionStorage.getItem("user"));
    var type=window.sessionStorage.getItem("type");
    const navigate = useNavigate();

    const [user, setUser] = useState("")
    const [orders, setOrders] = useState([]);
    useEffect(() => {

        async function abc() {
            if (user_find !== null && type=="Buyer") {

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
  return(
      <div>
<Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}> 
<Grid item xs> 
<p>Welcome to the Buyer Portal</p><p>Pls Click the following options to perform the operations </p>
</Grid>
  <Grid item xs> 
      <Button onClick={()=>{navigate("/bviewprofile")}}>View Profile</Button>  
</Grid>  <Grid item xs> 

  <Button onClick={()=>{navigate("/bvieworder")}}>My Orders</Button>
  </Grid>  <Grid item xs> 

    <Button onClick={()=>{navigate("/bviewfood")}}>Order Food</Button>
    </Grid>  <Grid item xs> 

     <Button onClick={()=>{navigate("/wallet")}}>Add Money</Button>
     </Grid>  

     </Grid>

      </div>
  );
}
export default ViewOrder;