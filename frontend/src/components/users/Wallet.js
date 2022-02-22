import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import poster from "../../com_env"
const WalletChange = (props) => {
    const navigate = useNavigate();
    var type=window.sessionStorage.getItem("type");

    const [email, setemail] = useState("");
    const [wallet, setWallet] = useState(0);
    const [display,setDisplay]=useState(0);
    var user = JSON.parse(window.sessionStorage.getItem("user"));
    useEffect(() => {
        async function abc() {
            if (user !== null && type=="Buyer") {
                const newFood = {
                    name: user.email
                }
                poster
                    .post("/Buyer/viewprofile", newFood)
                    .then((response) => {
                        setDisplay(response.data.wallet)
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
        abc();
    })
    async function onSubmit() {
        try {
            const newFood = {
                email: user.email,
                money: wallet
            }
            poster
                .post("/Buyer/increasemoney", newFood)
                .then((response) => {
                    alert("Added");
                    // console.log(response.data.wallet)
                    // return response.status(200).json(response.data)
                });
                window.location.reload()
        }
        catch (error) {
            console.log(error.message);
        }
    }
    return (<div>
          
        <Grid justifyContent="center" alignItems="center">
<Grid item xs>

Wallet: {display}

</Grid>

            <TextField id="Wallet" value={wallet} onChange={(e) => { setWallet(e.target.value) }} />

            <Button onClick={() => onSubmit()}>
                Money in wallet
            </Button>
        </Grid></div>
    );
};
export default WalletChange;