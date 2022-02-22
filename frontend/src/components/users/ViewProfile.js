import React, { useState, useEffect } from "react";
// import { useFocusEffect } from '@react-navigation/native';
import  Grid  from "@mui/material/Grid";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import poster from "../../com_env"
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
const ViewProfile=()=>{
var user_find = JSON.parse(window.sessionStorage.getItem("user"));
const navigate = useNavigate();
var type=window.sessionStorage.getItem("type");

const [user,setUser]=useState("")
const[profile,setProfile]=useState([]);

useEffect(() => {

    async function abc() {
        if (user_find !== null && type=="Buyer") {

            const newUser = { name: user_find.email };

            poster
                .post("/Buyer/viewprofile",newUser)
                .then((response) => {
                    // setFoodItems(response.data)
setProfile(response.data);
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
return (
<div>
<Grid container direction={'column'} spacing={2}>
<Grid item xs={6}>
    <Item>{`Name: `}{profile.name}</Item>
    <Item>{`Email: `}{profile.email} </Item>
    <Item>{`Contact: `}{profile.contact} </Item>
    <Item>{`Age: `}{profile.age} </Item>
    <Item>
        {`Batch Name:`}{profile.batchName}
    </Item>
    <Item>
        {`Wallet: `}{profile.wallet}
    </Item>
    <Item>
        <Button onClick={()=>(navigate("/beditprofile"))}>Edit Profile</Button>
    </Item>
  </Grid>
    </Grid>
</div>
);
}
export default ViewProfile;
