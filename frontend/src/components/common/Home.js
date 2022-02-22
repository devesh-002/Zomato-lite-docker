import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

const Home = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  var user_find = JSON.parse(window.sessionStorage.getItem("user"));
  var type=window.sessionStorage.getItem("type")
const navigate=useNavigate();
  useEffect(() => {
    async function abc() {
      if (user_find !== null) {
if(type=="Buyer")
{
  navigate("/bdashboard")
}
else
{
  navigate("/vdashboard")
}
          
      }

  }
  abc()
  });

  return <div style={{ textAlign: "center" }}>Welcome to the page, To order food pls <a href="" onClick={()=>{navigate("/login")}}>Login</a>
  <p> New Here?
  Click to <a href="" onClick={()=>{navigate("/register")}}>Register</a> here</p>
  </div>;
};

export default Home;
