import axios from "axios";

const API = axios.create({
  baseURL: "https://expense-tracker-thki.onrender.com/api"
});

export default API;