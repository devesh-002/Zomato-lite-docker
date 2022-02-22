import { useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import poster from "../../com_env"
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { MenuItem } from "@mui/material";
import  Select from "@mui/material/Select";
const AddFoodItem = (props) => {
    const navigate = useNavigate();
    var user_find = JSON.parse(window.sessionStorage.getItem("user"));

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [canteen, setCanteen] = useState(user_find.ShopName);
    const [addon, setAddon] = useState([]);
    const [tags, setTags] = useState([]);
    const [veg,setVeg]=useState("Veg");
    const onFoodName = (event) => {
        setName(event.target.value);
    };
    const onFoodPrice = (event) => {
      var isNum= /^\d+$/.test(event.target.value);
      if(isNum )
        setPrice(event.target.value);
    else
    {
        alert("Enter valid input")
    }
    };
    const onVeg = (event) => {
        console.log(event.target.value)
        setVeg(event.target.value);
    };
    // const onCanteen = (event) => {
    //     setCanteen(event.target.value);
    // };

    const handleAddonNameChange = (idx) => (event) => {
        const newAddOn = addon.map((add, sidx) => {
            if (idx !== sidx) return add;
            return { ...add, name: event.target.value }
        })
        setAddon(newAddOn);
    }
    const handleAddonPrinceChange = (idx) => (event) => {
        var isNum= /^\d+$/.test(event.target.value);
        if(isNum ){
        const newAddOn = addon.map((add, sidx) => {
            if (idx !== sidx) return add;
            return { ...add, price: event.target.value }
        })
        setAddon(newAddOn);}
        else
        {
            alert("enter valid value")
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
            const newFood = {
                name: name,
                price: price,
                canteen: canteen,
                addon: addon,
                tags: tags,
                veg:veg
            }
            poster
                .post("/Vendor/addfood", newFood)
                .then((response) => {
                    if(response.status==200){
                    alert("Created\t" + response.data.name);
                    console.log(response.data);}
                    else
                    {
                        alert("Could not be created")
                    }
                });
navigate("/viewfood");
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
                    onChange={onFoodName}
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
                    helperText="Price with 0 in beginning"
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
    onChange={onVeg}
  >
      <MenuItem value="Veg">Veg</MenuItem>
      <MenuItem value="Non Veg">Non Veg</MenuItem>
  </Select></Grid>
            <Grid item xs={12}>
                {addon.map((add, idx) => (

                    <div id="addOn">
                        <TextField type="text" placeholder={`Addon ${idx + 1} name`} value={add.name}
                            onChange={handleAddonNameChange(idx)} />
                        <TextField type="text" placeholder="Addon Price" value={add.price} onChange={handleAddonPrinceChange(idx)} helperText="Price with 0 in beginning"/>
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

    <Button onClick={()=>onSubmit()}>Submit</Button>
    </Grid></Grid>

);
};
export default AddFoodItem;