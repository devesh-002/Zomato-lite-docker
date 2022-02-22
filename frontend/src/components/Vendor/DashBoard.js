import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import poster from "../../com_env"
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Button, Grid } from "@mui/material";
import Box from '@mui/material/Box';

const ViewBoard = () => {
    var user_find = JSON.parse(window.sessionStorage.getItem("user"));
    var type=window.sessionStorage.getItem("type");
    const navigate = useNavigate();


    useEffect(() => {

        async function abc() {
            if (user_find !== null && type=="Vendor") {

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
<p>Welcome to the Vendor Portal</p><p>Pls Click the following options to perform the operations </p></Grid>
  <Grid item xs> 
      <Button onClick={() => navigate("/vviewprofile")}>
                        My Profile</Button>  
</Grid>  <Grid item xs> 

  <Button onClick={() => navigate("/viewfood")}>
                        View Food    </Button>
  </Grid>  <Grid item xs> 

    <Button onClick={() => navigate("/vieworder")}>
                        Check Orders</Button>
    </Grid>  <Grid item xs> 

     <Button onClick={() => navigate("/stats")}>
                        Statistics</Button>
     </Grid>  

     </Grid>

      </div>
  );
}
export default ViewBoard;