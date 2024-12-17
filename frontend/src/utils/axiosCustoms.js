import axios from "axios";

const axiosCunstom = axios.create({
  baseURL: 'http://localhost:3000'
});

export default axiosCunstom
