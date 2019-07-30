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

  handleUpload = file => {
    return this.service.post("/upload", file).then(res => res.data);
  };

  handleUploadModel = file => {
    return this.service.post("/upload-asset", file).then(res => res.data);
  };

  createAsset = (title, price, description, model, size, image) => {
    return this.service
      .post("/create-asset", { title, price, description, model, size, image })
      .then(response => response.data);
  };

  createComment = (description, populateAsset) => {
    return this.service
      .post("/create-comment", { description, populateAsset })
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

  editAsset = (_id, title, price, description) => {
    return this.service
      .post("/edit-asset", { _id, title, price, description })
      .then(response => response.data);
  };

  editAssetImg = (_id, image) => {
    return this.service
      .post("/edit-asset-img", { _id, image })
      .then(response => response.data);
  };

  editAssetModel = (_id, model) => {
    return this.service
    .post("/edit-asset-model", {_id, model})
  }

  deleteAsset = id => {
    return this.service
      .delete("/delete-asset", { data: { id: id } })
      .then(response => response.data);
  };

  deleteComment = id => {
    return this.service
      .delete("/delete-comment", { data: { id: id } })
      .then(response => response.data);
  };
}
