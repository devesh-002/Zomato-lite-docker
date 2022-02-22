import { useState,useContext } from "react";
import Button from "@mui/material/Button";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import poster from "../../com_env"
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Context from "../../Context";

const EditVendorProfile = () => {
    // const { context_user, setContext } = useContext(Context);
    var user_find = JSON.parse(window.sessionStorage.getItem("user"));
const navigate=useNavigate()
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState(user_find.email);
    const [shopName, setShopName] = useState(user_find.ShopName);
    const [openTime, setOpenTime] = useState("");
    const [closeTime, setCloseTime] = useState("");

    async function editVendor() {
        try {
            let res = await poster.post('/Vendor/editvendor', {
                name: name,
                contact: contact,
                email: email,
                openTime: openTime,
                closeTime: closeTime
            })
            if (res.status === 200) {
                console.log('Success')
                // setContext({ ...context_user, user: res.data.email })
                navigate("/vdashboard")
            } else {
                console.log(res.data.someError)
            }
        }
        catch (err) {
            console.log(err.message)
        }

    }
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
                        defaultValue={user_find.email}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>                <Grid item xs={12}>

                    <TextField
                    label="Contact"
                        defaultValue={contact}
                        onChange={(e) => setContact(e.target.value)}
                    /></Grid>

                <Grid item xs={12}>
                    <TextField
                        id="vopentime"
                        label="Open Time"
                        value={openTime}
                        type="time"
                        defaultValue="07:30"
                        onChange={(e) => setOpenTime(e.target.value)}

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
                        value={closeTime}
                        type="time"
                        defaultValue="07:30"
                        onChange={(e) => setCloseTime(e.target.value)}

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
                    <Button onClick={() => editVendor()}>
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
export default EditVendorProfile;