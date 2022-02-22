import React, { useState, useEffect } from "react";
// import { useFocusEffect } from '@react-navigation/native';
import  Grid  from "@mui/material/Grid";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import poster from "../../com_env"
import { Link, useNavigate } from 'react-router-dom';
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
        if (user_find !== null && type=="Vendor") {
            const newUser = { name: user_find.email };

            poster
                .post("/Vendor/viewprofile",newUser)
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
    <Item>{`Shop Name: `}{profile.ShopName} </Item>
    <Item>
        {`Opening Time: `}{profile.OpeningDate}
    </Item>
    <Item>
        {`Closing Time: `}{profile.ClosingDate}
    </Item>
  </Grid>
<Item>  <Button onClick={()=>(navigate("/veditprofile"))}>Edit Profile</Button>
</Item>
    </Grid>
</div>
);
}
export default ViewProfile;
