import { useState } from "react";

import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from "@mui/material/Grid";
import http from "../../com_env"

// import DateAdapter from '@mui/lab/AdapterDateFns';
import { Link, useNavigate } from 'react-router-dom';


const Register = (props) => {
  const navigate = useNavigate();

  const [selected, setSelected] = useState("Buyer");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  //   const [date, setDate] = useState(null);
  const [age, setAge] = useState("");
  const [batchName, setbatchName] = useState("UG1");
  const [openTime, setopenTime] = useState("07:30");
  const [currentDate, setCurrentData] = useState(new Date());

  const [pass, setPass] = useState("");
  const [confpass, setConfPass] = useState("");
  const [closeTime, setcloseTime] = useState("07:30");
  const [shopName, setshopName] = useState("");
  const changeSelectOptionHandler = (event) => {
    setSelected(event.target.value);
  };
  const onChangeAge = (event) => {
    setAge(event.target.value);
  };
  const onChangePass = (event) => {
    setPass(event.target.value);
  };
  const onChangeConfPass = (event) => {
    setConfPass(event.target.value);
  }

  const onBatchName = (event) => {
    setbatchName(event.target.value);
  };

  const onopenTime = (event) => {
    setopenTime(event.target.value);
  };
  const oncloseTime = (event) => {
    setcloseTime(event.target.value);
  };
  const onshopName = (event) => {
    setshopName(event.target.value);
  };
  const onChangeContact = (event) => {
    setContact(event.target.value);
  };
  const onChangeUsername = (event) => {
    setName(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const resetInputs = () => {
    setName("");
    setEmail("");
    setContact("");
    setSelected("Buyer")
    setAge("");
    setbatchName("UG1");
    setopenTime("07:30");
    setcloseTime("07:30");
    setshopName("");
    setPass("");
    setConfPass("");
  };

  const onSubmit = () => {

    if (selected === "Buyer") {
      const newBuyer = {
        name: name,
        email: email,
        contact: contact,
        age: age,
        pass: pass,
        confpass: confpass,
        batchName: batchName
      };
      http
        .post("/Buyer/register", newBuyer)
        .then((response) => {
          if (response.status == 200) {
            alert("Created\t" + response.data.name);
            console.log(response.data);
            navigate("/login")
          }
          else {
            alert("Could not register,try again")
          }
        });
    }
    else {
      const newVendor = {
        name: name,
        email: email,
        contact: contact,
        shopName: shopName,
        openTime: openTime,
        pass: pass,
        confpass: confpass,
        closeTime: closeTime
      };
      http
        .post("/Vendor/register", newVendor)
        .then((response) => {
          if (response.status == 200) {
            alert("Created\t" + response.data.name);
            console.log(response.data);
            navigate("/login");
          }
          else {
            console.log(response.data)
            alert("Could not register,try again")
          }
        });
    }

    resetInputs();
  };
  if (selected === 'Buyer') {
    return (

      // <Box
      //     component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '40ch' }, }} noValidate
      //     autoComplete="off">
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
            id="bName"
            value={name}
            variant="outlined"
            label="Name"
            onChange={onChangeUsername}
          /></Grid>
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
            value={pass}
            type="password"

            variant="outlined"
            onChange={onChangePass}
            helperText="Password should be atleast 6 characters"

          /></Grid>
        <Grid item xs={12}>

          <TextField
            required
            id="bConfPass"
            label="Confirm Password"
            value={confpass}
            type="password"

            variant="outlined"
            onChange={onChangeConfPass}
            helperText="Password should be atleast 6 characters"

          /></Grid>
        <Grid item xs={12}>


          <TextField
            required
            id="bContact"
            label="Contact"
            value={contact}
            variant="outlined"
            onChange={onChangeContact}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="bAge"
            label="Age"
            variant="outlined"
            value={age}
            onChange={onChangeAge}
          />
        </Grid>      <Grid item xs={12}>

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
          <Button
            variant="contained"
            color="primary"
            type="submit"
            name="action"
            disableElevation
            onClick={() => onSubmit()}
          >
            Sign up
          </Button>
        </Grid>
      </Grid>
      // </Box>

    );
  }
  else {
    return (
      <Grid container align={"center"} spacing={8}>

        <Grid item xs={12}>

          <div>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select labelId="demo-simple-select-label" value={selected} id="selectvval" label="Type" onChange={changeSelectOptionHandler}>

                <MenuItem value="Buyer" >Buyer</MenuItem>
                <MenuItem value="Vendor" >Vendor</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Grid>
        <Grid item xs={12}>

          <TextField
            required
            id="vName"
            value={name}
            variant="outlined"
            label="Name"
            onChange={onChangeUsername}
          />
        </Grid>              <Grid item xs={12}>
          <TextField
            required
            id="vEmail"
            label="Email"
            value={email}
            variant="outlined"
            onChange={onChangeEmail}
          />
        </Grid>
        <Grid item xs={12}>

          <TextField
            required
            id="vPass"
            label="Password"
            value={pass}
            type="password"

            variant="outlined"
            onChange={onChangePass}
            helperText="Password should be atleast 6 characters"

          /></Grid>
        <Grid item xs={12}>

          <TextField
            required
            id="vConfPass"
            label="Confirm Password"
            value={confpass}
            type="password"

            variant="outlined"
            onChange={onChangeConfPass}
            helperText="Password should be atleast 6 characters"

          />
        </Grid>              <Grid item xs={12}>
          <TextField
            required
            id="vContact"
            label="Contact"
            variant="outlined" value={contact}
            onChange={onChangeContact}
          />
        </Grid>
        <Grid item xs={12}>

          <TextField
            required
            id="vShopeName"
            label="Shop Name"
            variant="outlined"
            onChange={onshopName}
          />
        </Grid>

        <Grid item xs={12}>

          <TextField
            id="vopentime"
            label="Open Time"
            value={openTime}
            type="time"
            defaultValue="07:30"
            onChange={onopenTime}

            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            sx={{ width: 150 }}
          />


        </Grid>
        <Grid item xs={12}>
          <TextField
            id="vclosetime"
            label="Close Time"
            type="time"
            defaultValue="07:30"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            sx={{ width: 150 }}
            onChange={oncloseTime}
            value={closeTime}
          />
        </Grid>               <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            name="action"
            disableElevation
            onClick={() => onSubmit()}
          >
            Sign up
          </Button>
        </Grid></Grid>
    );
  }
};

export default Register;
