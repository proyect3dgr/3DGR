import axios from "axios";

export default class assetServices {
  constructor() {
    this.service = axios.create({
      baseURL: "http://localhost:5000",
      withCredentials: true
    });
  }

  assets = () => {
    return this.service.get("/assets").then(response => response.data);
  };

  createAsset = (title, price, description) => {
    return this.service
      .post("/create-asset", { title, price, description })
      .then(response => response.data);
  };

  getUser = params => {
    return this.service.get(`/user/${params}`).then(response => response.data);
  };

  getAsset = params => {
    return this.service
      .get(`/product/${params}`)
      .then(response => response.data);
  };
}
