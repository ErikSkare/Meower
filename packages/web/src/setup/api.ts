import axios from "axios";

const BASE_URL =
  (!process.env.NODE_ENV || process.env.NODE_ENV) === "development"
    ? "http://localhost:4000/api"
    : process.env.API_BASE_URL;

export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
