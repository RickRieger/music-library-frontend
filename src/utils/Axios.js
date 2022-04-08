import axios from "axios";
const Axios = axios.create({
  baseURL:
    process.env.REACT_APP_AXIOS === "development"
      ? "http://127.0.0.1:8000/api"
      : "/api",
  timeout: 50000,
});
export default Axios;