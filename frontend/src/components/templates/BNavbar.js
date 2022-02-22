import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ cursor: "pointer" }}
                        onClick={() => navigate("/")}
                    >
                        Canteen Portal
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button color="inherit" onClick={() => navigate("/bdashboard")}>
DashBoard
                    </Button>
                    <Button color="inherit" onClick={() => navigate("/bviewfood")}>
                        Order Food
                    </Button>
                    <Button color="inherit" onClick={() => navigate("/bvieworder")}>
                        My Orders
                    </Button>
                    <Button color="inherit" onClick={() => navigate("/wallet")}>
                        Add Money
                    </Button>
                    {/* <Button color="inherit" onClick={() => navigate("/register")}>
                        Register
                    </Button>
                    <Button color="inherit" onClick={() => navigate("/login")}>
                        Login
                    </Button> */}
                    <Button color="inherit" onClick={() => navigate("/bviewprofile")}>
                        My Profile
                    </Button>
                    <Button color="inherit" onClick={() => { window.sessionStorage.clear(); navigate("/login");window.location.reload();}}>
                        Logout
                    </Button>

                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;
