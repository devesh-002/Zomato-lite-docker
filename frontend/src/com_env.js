import axios from "axios";


export default axios.create({
  baseURL: "/api" || 'http://localhost:4000',
  headers: {
    "Content-type": "application/json"
  }
});