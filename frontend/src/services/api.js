import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "https://blood-donation-project-dxur.onrender.com/api",
});

export default API;
