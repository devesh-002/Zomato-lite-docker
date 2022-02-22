import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Button, Grid } from "@mui/material";
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import poster from "../../com_env"
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const ViewStats = () => {
    var user_find = JSON.parse(window.sessionStorage.getItem("user"));
    const navigate = useNavigate();
    var type = window.sessionStorage.getItem("type");
    const [orders, setOrders] = useState([]);
    const [ordersPlaced, setOrdersPlaced] = useState(0);
    const [pendingOrders, setPendingOrders] = useState(0);
    const [completedOrders, setCompletedOrders] = useState(0);
    const [top5items, setTop5Items] = useState([]);
    const [batchWiseOrders, setBatchWiseOrders] = useState({ "UG1": 0, "UG2": 0, "UG3": 0, "UG4": 0, "UG5": 0, "PG1": 0, "PG2": 0, "PhD": 0, "Others": 0 });
    const [batchNames, setBatchNames] = useState(["UG1", "UG2", "UG3", "UG4", "UG5", "PG1", "PG2", "PhD", "Others"]);
    const [batchNamesVals, setBatchNamesVals] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [ageRanges, setAgeRanges] = useState(["0-10", "10-20", "20-30", "30-40", "40-50", ">50"]);
    const [ageRangeValues, setAgeRangeValues] = useState([0, 0, 0, 0, 0, 0]);
    const [OrderVals, setOrderVals] = useState([]);
    useEffect(() => {

        async function abc() {
            if (user_find !== null && type == "Vendor") {

                const newUser = { canteen: user_find.ShopName };
                poster
                    .post("/Order/getvendororders", newUser)
                    .then((response) => {
                        setOrders(response.data)
                        var x = response.data;
                        setOrdersPlaced(response.data.length)
                        var countPends = 0, countCompl = 0;
                        for (var i = 0; i < x.length; i++) {
                            if (x[i].status == "COMPLETED") {
                                countCompl++;
                                // poster
                                //     .post("/Buyer/viewprofile", { name: x[i].email })
                                //     .then((res) => {
                                //         // setFoodItems(res.data)
                                //         batchStorer[res.data.batchName] = batchStorer[res.data.batchName] + 1;
                                //         // console.log("lol"); 
                                //         // console.log(batchStorer)
                                //     });
                            }
                            else if (x[i].status == "REJECTED") { ; }
                            else {
                                countPends++;
                            }
                        }
                        // setBatchWiseOrders(batchStorer)
                        // console.log(batchStorer)
                        setPendingOrders(countPends);
                        setCompletedOrders(countCompl);
                    });
                poster
                    .post("/Vendor/getfood", { canteen: user_find.ShopName })
                    .then((resp) => {
                        var x = []
                        x = resp.data.fooditems; var ans = []
                        x.sort(function (a, b) {
                            return b.rating_util - a.rating_util
                        });
                        for (var i = 0; i < Math.min(x.length, 5); i++) {
                            ans.push(x[i]);
                        }
                        setTop5Items(ans);
                        // console.log(ans)
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
    }, [])
    const BarChart = (label, x, y) => {
        return (
            <div>
                <Bar
                    data={{
                        labels: x,
                        datasets: [
                            {
                                label: label,
                                data: y,
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(75, 192, 192, 0.2)'

                                ],
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(75, 192, 192, 1)'
                                ],
                                borderWidth: 1,
                            },
                        ],
                    }}
                    height={400}
                    width={600}
                    options={{
                        maintainAspectRatio: false,
                        scales: {
                            yAxes: [
                                {
                                    ticks: {
                                        beginAtZero: true,
                                    },
                                },
                            ],
                        },
                        legend: {
                            labels: { fontSize: 30, },
                        },
                    }}
                />
            </div>
        )
    }

    async function getGraphs() {
        var batchStorer = { "UG1": 0, "UG2": 0, "UG3": 0, "UG4": 0, "UG5": 0, "PG1": 0, "PG2": 0, "PhD": 0, "Others": 0 };
        var age_ranges = { "0-10": 0, "10-20": 0, "20-30": 0, "30-40": 0, "40-50": 0, ">50": 0 };

        for (var i = 0; i < orders.length; i++) {
            if (orders[i].status == "COMPLETED") {
                await poster
                    .post("/Buyer/viewprofile", { name: orders[i].email })
                    .then((res) => {
                        // setFoodItems(res.data)
                        batchStorer[res.data.batchName] = batchStorer[res.data.batchName] + 1;
                        if (res.data.age < 10) {
                            age_ranges["0-10"]++;
                        }
                        else if (res.data.age >= 10 && res.data.age < 20) {
                            age_ranges["10-20"]++;
                        }
                        else if (res.data.age >= 20 && res.data.age < 30) {
                            age_ranges["20-30"]++;
                        }
                        else if (res.data.age >= 30 && res.data.age < 40) {
                            age_ranges["30-40"]++;
                        }
                        else if (res.data.age >= 40 && res.data.age < 50) {
                            age_ranges["40-50"]++;
                        }
                        else {
                            age_ranges[">50"]++;
                        }
                    });
            }
        }
        setBatchWiseOrders(batchStorer);
        var y = [];
        console.log(batchNames)
        for (var i = 0; i < batchNames.length; i++) {
            y.push(batchStorer[batchNames[i]])
        }
        setBatchNamesVals(y);
        var yy=[];
        for (var i = 0; i < ageRanges.length; i++) {
            yy.push(age_ranges[ageRanges[i]])
        }
setAgeRangeValues(yy);
        return (<div>
        </div>);
    }

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
    const displayAddOns = (addon, index) => {
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

    const displayFoodItem = (foodItem, index) => {
        try {
            return (
                <Item>                    <p>{`Food Name ${index + 1}: `}{foodItem.name} </p>
                    <p>{`Price: Rs `}{foodItem.price}</p>
                    <p>{`Canteen: `}{foodItem.canteen} </p>
                    <p>{`Rating: `} {Math.round(foodItem.rating * 10) / 10} {`/5`} </p>
                    <p> {`Count: `}{foodItem.rating_util} </p>
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
                                {displayAddOns(addon, idx)}
                            </div>
                        ))

                        }
                    </div>

                </Item>
            );
        }
        catch (error) {
            console.log(error);
        }
    };

    return (<div>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="center">

            <Grid item xs>


                <Item>
                    {`Orders Placed:- ${ordersPlaced}`}

                </Item>
                <Item>
                    {`Pending Orders:- ${pendingOrders}`}

                </Item><Item>
                    {`Completed Orders:- ${completedOrders}`}

                </Item>
                {

                    top5items.map((order, idx) => (

                        <div>
                            {displayFoodItem(order, idx)}
                        </div>
                    ))
                }
                <Item>       <Button onClick={() => { getGraphs() }}>Get Graphs</Button>
                </Item>
            </Grid>

        </Grid>
        {BarChart("Batch-wise distribution of Completed orders", batchNames, batchNamesVals)}
        {BarChart("Age-wise distribution of Completed orders", ageRanges, ageRangeValues)}

    </div>);
}
export default ViewStats;





