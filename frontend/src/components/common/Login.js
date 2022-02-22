import { useState, useContext } from "react";
import Button from "@mui/material/Button";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Grid from "@mui/material/Grid";
import Context from "../../Context";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from 'react-router-dom';
import http from "../../com_env"
const Login = (props) => {
    const [selected, setSelected] = useState("Buyer");
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [redir, setRedir] = useState(false);
    const loggedInUser =JSON.parse(window.sessionStorage.getItem("user"));
    var type=window.sessionStorage.getItem("type")
    const changeSelectOptionHandler = (event) => {
        setSelected(event.target.value);
    };
    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    };
    const onChangePass = (event) => {
        setPass(event.target.value);
    };


    const resetInputs = () => {
        setEmail("");
        setSelected("Buyer")
        setPass("");
    };
    const onSubmit = () => {
        if(loggedInUser!==null)
        {
    if(type=="Buyer")
    {
        navigate("/bdashboard");
    }
    else
    navigate("/vdashboard")
    window.location.reload();
}
        let res;

        if (selected === "Buyer") {
            const newUser = {
                email: email,
                pass: pass
            };
          
            
            http
                .post("/Buyer/login", newUser)
                .then((response) => {
                    // console.log(response.data);
                    res = response.status
                    if (res === 200) {
                        alert("Logged in\t" + response.data.name);

                       window.sessionStorage.setItem("user",JSON.stringify(response.data));
                        window.sessionStorage.setItem("type","Buyer");

                  
                        console.log(window.sessionStorage.getItem("user"))
                        setRedir(true);
                        resetInputs(); 

                        navigate("/bdashboard");
                        window.location.reload();
                    }
                    else 
                    {
                        alert("Could Not login, try again")
                    }
                });
            // Redirect to respective UI
        }
        else {
            const newUser = {
                email: email,
                pass: pass
            };

            http
                .post("/Vendor/login", newUser)
                .then((response) => {
                    res = response.status;
                    if (res === 200) {
                        alert("Logged in\t" + response.data.name);

                        window.sessionStorage.setItem("user", JSON.stringify(response.data));
                        window.sessionStorage.setItem("type","Vendor");
                  
                        setRedir(true);
                        resetInputs();
                        console.log(window.sessionStorage.getItem("user"));
                        navigate("/vdashboard");
                        window.location.reload();
                    }
                    else 
                    {
                        alert("Could Not login, try again")
                    }
                });
            // Redirect to respective UI
        }


    };

    return (

        <Grid container align={"center"} spacing={10}>
            <Grid item xs={12}>
                <div>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <Select labelId="demo-simple-select-label" value={selected} id="selectbval" label="Type" onChange={changeSelectOptionHandler}>

                            <MenuItem value="Buyer" >Buyer</MenuItem>
                            <MenuItem value="Vendor" >Vendor</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </Grid>
            <Grid item xs={12}>

                <TextField
                    required
                    id="bEmail"
                    label="Email"
                    value={email}
                    variant="outlined"
                    onChange={onChangeEmail}
                /></Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    id="bPass"
                    label="Password"
                    type="password"
                    value={pass}
                    variant="outlined"
                    onChange={onChangePass}
                    helperText="Password should be atleast 6 characters"

                /></Grid>
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    name="action"
                    disableElevation
                    onClick={() => onSubmit()}
                >
                    Login          </Button>
            </Grid>
        </Grid>
    );
};

export default Login;