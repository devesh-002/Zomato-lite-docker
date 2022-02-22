import { useState, useContext } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import http from "../../com_env"
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Context from "../../Context";

const EditBuyerProfile = () => {
    // const { context_user, setContext } = useContext(Context);
    var user_find = JSON.parse(window.sessionStorage.getItem("user"));
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState(user_find.email);
    const [age, setAge] = useState("");
    const [batchName, setbatchName] = useState("UG1");

    async function editBuyer() {
        try {
            var isNum = /^\d+$/.test(contact)
            if(!isNum)
            {
                alert("Enter valid contact");
                return;
            }
            let res = await http.post('/Buyer/editbuyer', {
                name: name,
                contact: contact,
                email: email,
                age: age,
                batchName: batchName
            })
            if (res.status === 200) {
                console.log('Success')
                navigate("/bdashboard")
                // setContext({ ...context_user, user: res.data.email })
            } else {
                alert("Could not be edited")
                console.log(res.data.someError)
            }
        }
        catch (err) {
            console.log(err.message)
        }
        resetInputs();
    };
    const onBatchName = (event) => {
        setbatchName(event.target.value);
    };

    const onChangeAge = (e) => {
        var isNum = /^\d+$/.test(e.target.value)
        if (isNum || e.target.value == "") { setAge(e.target.value) }
        else { alert("Enter valid value"); return; }
    };
    const onChangeContact = (e) => {
   setContact(e.target.value);
    };
    const resetInputs = () => {
        setName("");
        setContact("");
        setAge("");
        setbatchName("UG1");
    };
    const EditDisplay = () => {
        return (
            <Grid container align={"center"} spacing={10}>
                <Grid item xs={12}>
                    <TextField
                        defaultValue={name}
                        label="Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>

                    <TextField
                        label="Email"
                        defaultValue={user_find.email}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12}>

                    <TextField
                        label="Contact"
                        defaultValue={contact}
                        onChange={onChangeContact}
                    /></Grid>



                <Grid item xs={12}>
                    <TextField
                        required
                        id="bAge"
                        label="Age"
                        variant="outlined"
                        value={age}
                        onChange={onChangeAge}
                    />
                </Grid>
                <Grid item xs={12}>

                    <FormControl fullWidth>
                        <InputLabel >Batch Name</InputLabel>
                        <Select labelId="demo-simple-select-label" value={batchName} id="bBatchName" label="Type" onChange={onBatchName}>

                            <MenuItem value="UG1" >UG1</MenuItem>
                            <MenuItem value="UG2" >UG2</MenuItem>
                            <MenuItem value="UG3" >UG3</MenuItem>
                            <MenuItem value="UG4" >UG4</MenuItem>
                            <MenuItem value="UG5" >UG5</MenuItem>
                            <MenuItem value="PG1" >PG1</MenuItem>
                            <MenuItem value="PG2" >PG2</MenuItem>
                            <MenuItem value="PhD" >PhD</MenuItem>
                            <MenuItem value="Others" >Others</MenuItem>

                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={() => editBuyer()}>
                        Edit Profile
                    </Button>
                </Grid>
            </Grid>

        );
    };
    return (
        <div>
            <div>
                {EditDisplay()}
            </div>
        </div>
    )

};
export default EditBuyerProfile;