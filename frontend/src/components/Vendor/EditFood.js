import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { MenuItem } from "@mui/material";
import  Select from "@mui/material/Select";
import poster from "../../com_env"
function ComponentB() {
    const location = useLocation();
    const navigate = useNavigate();

    const [food_items, setFoodItems] = useState([]);
    const [addon, setAddon] = useState(location.state.addon);

    const [tags, setTags] = useState(location.state.tags);
    const [price, setPrice] = useState(location.state.price);
    const [veg, setVeg] = useState("Veg");

    const name = location.state.name;
    const canteen = location.state.canteen;


    const handleAddonNameChange = (idx) => (event) => {
        const newAddOn = addon.map((add, sidx) => {
            if (idx !== sidx) return add;
            return { ...add, name: event.target.value }
        })
        setAddon(newAddOn);
    }
    const onFoodPrice = (event) => {
        var isNum= /^\d+$/.test(event.target.value);
        if(isNum || event.target.value==""){
        setPrice(event.target.value);}
        else
        {
            alert ("Enter valid value");
   
        }
    };
    const handleAddonPrinceChange = (idx) => (event) => {
        var isNum= /^\d+$/.test(event.target.value);
if(isNum || event.target.value==""){
        const newAddOn = addon.map((add, sidx) => {
            if (idx !== sidx) return add;
            return { ...add, price: event.target.value }
        })
        setAddon(newAddOn);}
        else
        {
            alert ("Enter valid value");
        }
    }
    const handleTagsNameChange = (idx) => (event) => {
        const newTags = tags.map((tag, sidx) => {
            if (idx !== sidx) return tag;
            return { ...tag, name: event.target.value }
        })
        setTags(newTags);
    }
    async function onSubmit() {
        try {
            const editFood = {
                name: name,
                price: price,
                canteen: canteen,
                addon: addon,
                tags: tags,
                veg:veg
            }
            poster
                .post("/Vendor/editfood", editFood)
                .then((response) => {
                    if(response.status==200){
                    alert("Edited\t");
                    console.log(response.data);}
                    else
                    {
                    alert("Could not edit")
                    }
                });
            navigate('/viewfood');

        }
        catch (error) {
            console.log(error.message);
        }
    }

    return (

        <Grid container align={"center"} spacing={10}>

            <Grid item xs={12}>
                <TextField
                    required
                    id="food_name"
                    value={name}
                    variant="outlined"
                    label="Name"
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    required
                    id="price"
                    value={price}
                    variant="outlined"
                    label="Price"
                    onChange={onFoodPrice}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    id="canteen"
                    value={canteen}
                    variant="outlined"
                    label="Canteen"
                    InputProps={{
                        readOnly: true,
                    }}
                /></Grid>
            <Grid item xs={12}>

                <Select
                    labelId="demo-simple-select-abel"
                    id="demo-simple-elet"
                    value={veg}
                    label="Veg or Non Veg"
                    onChange={e => setVeg(e.target.value)}
                >
                    <MenuItem value="Veg">Veg</MenuItem>
                    <MenuItem value="Non Veg">Non Veg</MenuItem>
                </Select></Grid>
            <Grid item xs={12}>
                {addon.map((add, idx) => (

                    <div id="addOn">
                        <TextField type="text" placeholder={`Addon ${idx + 1} name`} value={add.name}
                            onChange={handleAddonNameChange(idx)}    />
                        <TextField type="text" placeholder="Addon Price" value={add.price} onChange={handleAddonPrinceChange(idx)} />
                    </div>

                ))}
            </Grid>
            <Grid item xs={12}>

                <Button
                    onClick={() => setAddon(addon.concat([{ name: "", price: 0 }]))}
                >
                    Add Ons
                </Button>
            </Grid>
            <Grid item xs={12}>
                {tags.map((tag, idx) => (
                    <div id="tags">
                        <TextField type="text" placeholder={`tag on ${idx + 1} name`} value={tag.name}
                            onChange={handleTagsNameChange(idx)} />
                    </div>

                ))}
            </Grid>
            <Grid item xs={12}>

                <Button
                    onClick={() => setTags(tags.concat([{ name: "" }]))}
                >
                    Add Tags
                </Button>

            </Grid>
            <Grid item xs={12}>

                <Button
                    onClick={() => onSubmit()}
                >
                    Edit</Button>

            </Grid>
        </Grid>
    )
}

export default ComponentB;