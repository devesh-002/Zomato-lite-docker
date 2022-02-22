import React, { useState, useEffect } from "react";
import { Link, useNavigate,useLocation } from 'react-router-dom';
import axios from "axios";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Button, Grid } from "@mui/material";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import Typography from '@mui/material/Typography';
import http from "../../com_env"
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',

    color: theme.palette.text.secondary,
}));
const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };
  
const ViewOrder = () => {
    var user_find = JSON.parse(window.sessionStorage.getItem("user"));
    const location = useLocation();
    const [id,setId]=useState(location.state.id)
    var type=window.sessionStorage.getItem("type");

    const navigate = useNavigate();
    const [value, setValue] = React.useState(2);
        const [hover, setHover] = React.useState(-1);
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
    
      async function onSubmit(rating){
          console.log(rating);
          await http
          .post("/Buyer/rating", {id:id,rating:rating})
          .then((response) => {
            try {
                console.log(response.data);
                navigate("/bdashboard")
            }
            catch (err) {
                return response.status(201).json({ Error: err })
            }
        });
          
      }
        return (
<Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justifyContent="center"
  style={{ minHeight: '100vh' }}
>                <Grid item xs={3}>
<Item>
            <Typography  variant="h2">
            Thanks For Ordering
          </Typography></Item>          </Grid>
          <Grid item xs={3}>

          <Box
            sx={{
              width: 200,
              display: 'flex',
            }}
          >

            <Rating 
              value={value}
              precision={1}
              size="large"
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              onClick={(event)=>onSubmit(event.target.value)}
              emptyIcon={
              <StarIcon  style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            {value !== null && (
              <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
          </Box>
          </Grid>
    </Grid>
    );
};
export default ViewOrder;