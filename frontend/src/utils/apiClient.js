import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";

const options = {
  ignoreHeaders: true, //ヘッダーの命名記法変換を無効
}

const client = applyCaseMiddleware(
  axios.create({
    baseURL: import.meta.env.VITE_RAILS_API_DOMEIN,
  }), 
  options
);

export default client;
