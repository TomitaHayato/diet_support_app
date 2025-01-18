import axios from "axios";

const axiosCunstom = axios.create({
  baseURL: import.meta.env.VITE_RAILS_API_DOMEIN,
});

export default axiosCunstom
