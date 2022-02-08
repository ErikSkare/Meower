import axios from "axios";

const BASE_URL = "http://localhost:4000/api/";

export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
