import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import Fuse from "fuse.js";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select'; 
import FormControl from '@mui/material/FormControl';
import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import poster from "../../com_env"
import ListItem from "@mui/material/ListItem";
const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 5
        }}
    />
);
const commonStyles = {
    bgcolor: 'background.paper',
    m: 1,
    border: 1,
    width: '12rem',
    height: '30rem',
};

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const ViewFood = () => {

    const navigate = useNavigate();
    var user_find = JSON.parse(window.sessionStorage.getItem("user"));
    const [user, setUser] = useState("");
    const [food_items, setFoodItems] = useState([]);
    const [always_food_items, setAlwaysFoodItems] = useState([]);
    const [value, setValue] = useState("");
    const [unique_arr, setUniqueArr] = useState([]);
    const [searchBarVal, setSearchBarVal] = useState("");
    const [minCost, setMinCost] = useState(0);
    const [maxCost, setMaxCost] = useState(100);
    const [sliderVal, setSliderVal] = useState([0, 100]);
    const [shopNames, setShopNames] = useState([]);
    const [shopNamesDates, setShopNamesDates] = useState([]);
    const [shopNamesValue, setShopNamesValue] = useState(new Map());
    const [sortPrice, setsortPrice] = useState(null)
    const [sortRating, setSortRating] = useState(null)
    const [color, setColor] = useState("");
    const [count, setCount] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [veg, setVeg] = useState(false);
    const [nonVeg, setNonVeg] = useState(false);
    const useMountEffect = (fun) => useEffect(fun, [])
    var type=window.sessionStorage.getItem("type");

    const printSort = () => {
        console.log('printSort')
        if (sortPrice === true) {
            setFoodItems([...food_items.sort((a, b) => (a.price > b.price ? 1 : -1))])
        } else if (sortPrice === false) {
            setFoodItems([...food_items.sort((a, b) => (a.price < b.price ? 1 : -1))])
        }
        if (sortRating === true) {
            setFoodItems([...food_items.sort((a, b) => (a.rating > b.rating ? 1 : -1))])
        } else if (sortRating === false) {
            setFoodItems([...food_items.sort((a, b) => (a.rating < b.rating ? 1 : -1))])
        }
    }

    const onSearch = search => {
        var selected_food_items = [];

        const fuse = new Fuse(
            always_food_items, {
            keys: ['name']
        }
        )
        if (search !== "") {
            selected_food_items = fuse.search(search).map(item => item.item);
        }
        else {
            selected_food_items = always_food_items;
        }
        var food_select = [];
        if (veg == true && nonVeg == false) {
            for (var i = 0; i < selected_food_items.length; i++) {
                if (selected_food_items[i].veg == "Veg") {
                    food_select.push(selected_food_items[i]);
                }
            }
        }
        else if (veg == false && nonVeg == true) {
            for (var i = 0; i < selected_food_items.length; i++) {
                if (selected_food_items[i].veg == "Non Veg") {
                    food_select.push(selected_food_items[i]);
                }
            }
        }
        else {
            food_select = selected_food_items;
        }
        selected_food_items = food_select;
        //MENU SEARCH BELOW
        var menu_selected_items = [];
        if (value !== "") {

            for (var i = 0; i < selected_food_items.length; i++) {
                for (var j = 0; j < selected_food_items[i].tags.length; j++) {

                    if ((selected_food_items[i].tags[j].name == value))
                        menu_selected_items.push(selected_food_items[i]);
                }
            }

        }
        else {
            menu_selected_items = selected_food_items;
        }
        selected_food_items = [];
        for (var i = 0; i < menu_selected_items.length; i++) {
            if ((menu_selected_items[i].price >= sliderVal[0]) && (menu_selected_items[i].price <= sliderVal[1])) {
                selected_food_items.push(menu_selected_items[i]);
            }
        }
        menu_selected_items = [];
        // console.log(selectedTags)
        if (selectedTags.length != 0) {
            for (var j = 0; j < selected_food_items.length; j++) {
                for (var i = 0; i < selectedTags.length; i++) {
                    if (selected_food_items[j].canteen == selectedTags[i]) {
                        menu_selected_items.push(selected_food_items[j]); break;
                    }
                }
            }
        }
        else {
            menu_selected_items = selected_food_items;
        }
        // menu_selected_items=[...new Set(menu_selected_items)];
        setFoodItems(menu_selected_items)
    };
    const timeChecker = (canteen) => {

        var dt = new Date();//current Date that gives us current Time also

        var startTime = shopNamesDates[canteen].open;
        var endTime = shopNamesDates[canteen].close;

        var s = startTime.split(':');
        var dt1 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(),
            parseInt(s[0]), parseInt(s[1]));

        var e = endTime.split(':');
        var dt2 = new Date(dt.getFullYear(), dt.getMonth(),
            dt.getDate(), parseInt(e[0]), parseInt(e[1]));

        if (dt2 > dt1) {
            if (dt >= dt1 && dt <= dt2)
                return true;
            else
                return false;
        }
        else {
            if (dt >= dt2 && dt <= dt1)
                return false;
            else
            
                return true;
        }
    }
    async function abcd() {
        if (user_find !== null) {
            console.log("WHYYY")
            poster
                .post("/Buyer/getallfood")
                .then((response) => {
                    setFoodItems(response.data)
                    setAlwaysFoodItems(response.data);
                    var x = response.data;
                    for (var i = 0; i < x.length; i++) {
                        x[i].order = 0;
                        for (var j = 0; j < x[i].addOns.length; j++) {
                            x[i].addOns[j].order = 0;
                        }
                    }
                    var tag_arr = [""];
                    var a = [];
                    for (var i = 0; i < x.length; i++) {
                        a.push(0);
                    } setCount(a);
                    var minPrice = 100000000; var maxPrice = -1;
                    for (var i = 0; i < x.length; i++) {
                        minPrice = Math.min(x[i].price, minPrice);
                        maxPrice = Math.max(x[i].price, maxPrice);
                        for (var j = 0; j < x[i].tags.length; j++) {

                            tag_arr.push(x[i].tags[j].name)

                        }
                    }
                    setUniqueArr([...new Set(tag_arr)]);
                    if (minPrice === 100000000) minPrice = 0; if (maxPrice === -1) maxPrice = 100;
                    setSliderVal([minPrice, maxPrice]);
                    setMaxCost(maxPrice); setMinCost(minPrice);

                    var shop_names = [];
                    for (var i = 0; i < x.length; i++) {
                        shop_names.push(x[i].canteen);
                    }
                    setShopNames([...new Set(shop_names)]);
                    shop_names = [...new Set(shop_names)]
                    // console.log([...new Set(shop_names)])
                    var shop_names_time = [];

                    for (var i = 0; i < shop_names.length; i++) {
                        poster
                            .post("/Vendor/viewprofilecanteen", { canteen: shop_names[i] })
                            .then((response) => {
                                shop_names_time[response.data.ShopName] = { "open": response.data.OpeningDate, "close": response.data.ClosingDate }
                            })
                    }
                    
                    setShopNamesDates(shop_names_time)
                    var shop_names_util = new Map();

                    for (var i = 0; i < shop_names.length; i++) {
                        shop_names_util.set(shop_names[i], false)
                    }

                    setShopNamesValue(shop_names_util);

                    const newUser = { name: user_find.email };
                    poster
                        .post("/Buyer/viewprofile", newUser)
                        .then((response) => {
                            // setFoodItems(response.data)
                            console.log(response.data)

                            setUser(response.data)
                        });
                });

        }


    }
    const [wallet,setWallet]=useState(0);
    useEffect(() => {

        async function abc() {
            if (user_find !== null && type=="Buyer") {
                poster
                    .post("/Buyer/getallfood")
                    .then((response) => {
                        // setFoodItems(response.data)
                        setAlwaysFoodItems(response.data);

                    });
setWallet(user_find.wallet);

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

    useMountEffect(abcd)

    const displayTags = (tag, index) => {

        try {
            if (tag.name.length === 0) return;
            return (
                <div>
                    <p>
                        {`Tag ${index + 1}: `} {tag.name}
                    </p>
                </div>
            );
        }
        catch (error) {
            console.log(error)
        }
    };
    const displayAddOns = (addon, index, checker) => {
        try {
            if (addon.name.length === 0) return;
            return (
                <div>
                    <p>{`Addon ${index + 1}: `}{addon.name}{" ,Price: Rs "}{addon.price}</p> 
                </div>
            );
        }
        catch (error) {
            console.log(error);
        }
    };

    const sendOrder =(foodItem)=>{
var addons_util=[];
for(var i=0;i<foodItem.addOns.length;i++)
{
    addons_util.push({name:foodItem.addOns[i].name,price:foodItem.addOns[i].price,foodName:foodItem.name,quantity:0});
}
navigate("/makeorder", { state: { canteen: foodItem.canteen,name:foodItem.name,addons:addons_util,tags:foodItem.tags,fprice:String(foodItem.price),rating:foodItem.rating } });
console.log(foodItem.price)
    }
    const displayFoodItem = (foodItem, index) => {
        try {

            var checker = !timeChecker(foodItem.canteen);
            //    if(checker)
            {
                return (

                    <Item>

                  
                        <p>{`Food Name ${index + 1}: `}{foodItem.name} </p>
                        <p>{`Price: Rs `}{foodItem.price}</p>
                        <p>{`Canteen: `}{foodItem.canteen} </p>
                        <p>{`Rating: `} {Math.round( foodItem.rating * 10) / 10} {`/5`} </p>
                        <p>{foodItem.veg}</p>

                        <div>
                            {foodItem.tags.map((tag, idx) => (
                                <div>
                                    {displayTags(tag, idx)}
                                </div>
                            ))

                            }
                        </div>
                        <div>
                            {foodItem.addOns.map((addon, idx) => (
                                <div>
                                    {displayAddOns(addon, idx, checker)}
                                </div>
                            ))

                            }
                        </div>
                        <Button  onClick={()=>{(sendOrder(foodItem))}} disabled={checker}>Order</Button>

                        <div>

                        </div>
                        <ColoredLine color="red" />
                    </Item>
                );
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    const displaySearchBar = () => {
        return (<div>
            <TextField
                id="standard-basic"
                label="Search"
                fullWidth={true}
                defaultValue=""
                onChange={e => setSearchBarVal(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment>
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}


            />
        </div>);
    }


    const Check = (event, newValue) => {
        setSliderVal(newValue);
    };
    const onSubmit = () => {
        onSearch(searchBarVal)
    };
  
    return (
        <div>
       
            <Grid container direction={'column'} spacing={2}>

                {displaySearchBar()}

                <FormControl fullWidth>

                    <InputLabel id="demo-sim-label">Tag Selection</InputLabel>

                    <Select label="Select Tag" value={value} onChange={e => setValue(e.target.value)}>
                        {unique_arr.map((todo, index) => {
                            return <MenuItem key={todo} value={todo}>{todo}</MenuItem>
                        })}

                        {/* {displayTagNames()}  */}

                    </Select></FormControl>

                <Slider
                    aria-label="Price"
                    defaultValue={(minCost + maxCost) / 2}
                    value={sliderVal}
                    valueLabelDisplay="auto"
                    marks
                    onChange={Check}
                    min={minCost}
                    max={maxCost}
                />   <Grid item xs align={"center"}>
                    <ListItem divider>
                        <Autocomplete
                            value={selectedTags}
                            onChange={(event, newValue) => {
                                setSelectedTags(newValue);
                            }}
                            id="combo-box-demo"
                            options={shopNames}
                            getOptionLabel={(option) => option}
                            fullWidth
                            multiple={true}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Select Canteen"
                                    variant="outlined"
                                />

                            )}
                        />

                    </ListItem>
                    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                        <FormControlLabel
                            label="Veg"
                            control={<Checkbox checked={veg} onClick={(e) => { setVeg(!veg) }} />}
                        />

                        <FormControlLabel
                            label="Non Veg"
                            control={<Checkbox checked={nonVeg} onChange={(e) => { setNonVeg(!nonVeg) }} />}
                        />
                    </Box>


                    <Button onClick={() => onSubmit()}>
                        Fitler
                    </Button>
                </Grid>
                <FormControl fullWidth>
                    <InputLabel id="demo-sim-label">Sort on Price</InputLabel>
                    <Select
                        labelId='demo-simple-se'
                        id='demo-simple---'
                        value={sortPrice}
                        onChange={e => setsortPrice(e.target.value)}
                    >
                        <MenuItem value={true}>Ascending</MenuItem>
                        <MenuItem value={false}>Descending</MenuItem>
                        <MenuItem value={null}>No Preference</MenuItem>
                    </Select></FormControl>
                <FormControl fullWidth>
                    <InputLabel id="demo-sim-label">Sort on Rating</InputLabel>
                    <Select
                        labelId='demo-simple'
                        id='demo-simple----'
                        value={sortRating}
                        onChange={e => setSortRating(e.target.value)}
                    >
                        <MenuItem value={true}>Ascending</MenuItem>
                        <MenuItem value={false}>Descending</MenuItem>
                        <MenuItem value={null}>No Preference</MenuItem>
                    </Select></FormControl>
                {/* </Grid></Grid> */}
                <Button onClick={() => printSort()}>
                    Sort
                </Button>
                <Grid item xs>

                    {
                        food_items.map((foodItem, idx) => (
                            <div>
                                {displayFoodItem(foodItem, idx)}
                            </div>
                        ))
                    }
                </Grid>

            </Grid>
         
        </div>
    );
};

export default ViewFood;