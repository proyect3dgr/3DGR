import React, { Component } from "react";
import assetServices from "../../Services/assetServices";

export default class EditAsset extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      price: "",
      description: "",
      image: "",
      model: "",
      size: "",
      created: false,
      imgUploaded: false,
      modelUploaded: false
    };
    this.service = new assetServices();
  }
  handleFormSubmit = event => {
    event.preventDefault();
    const title = this.state.title;
    const price = this.state.price;
    const description = this.state.description;
    const image = this.state.image;
    const model = this.state.model;
    const size = this.state.size;

    console.log(image);
    console.log(size);
    console.log(model);

    if (image) {
      this.service
        .createAsset(title, price, description, model, size, image)
        .then(response => {
          this.setState({
            title: "",
            price: "",
            description: "",
            image: "",
            model: "",
            size: ""
          });
        })
        .then(response => {
          this.setState({ created: true });
        })
        .catch(error => {
          console.log(error);
          this.setState({
            ...this.state,
            error: true
          });
        });
    } else {
      this.service
        .createAsset(title, price, description, model, size)
        .then(response => {
          this.setState({
            title: "",
            price: "",
            description: "",
            model: "",
            size: ""
          });
        })
        .then(response => {
          this.setState({ created: true });
        })
        .catch(error => {
          console.log(error);
          this.setState({
            ...this.state,
            error: true
          });
        });
    }
  };

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  // this method handles just the file upload
  handleImgUpload = e => {
    console.log("The file to be uploaded is: ", e.target.files[0]);
    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("modelImg", e.target.files[0]);

    this.service
      .handleUpload(uploadData)
      .then(response => {
        console.log("response is: ", response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        this.setState({ image: response.secure_url });
      })
      .then(response => {
        this.setState({ imgUploaded: true });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  };

  handleModelUpload = e => {
    console.log("The file to be uploaded is: ", e.target.files[0]);
    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("modelFile", e.target.files[0]);

    this.service
      .handleUploadModel(uploadData)
      .then(response => {
        console.log("response is: ", response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        this.setState({
          size: Math.floor(response.bytes / 2048),
          model: response.secure_url
        });
      })
      .then(response => {
        this.setState({ modelUploaded: true });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  };

  render() {
    return (
      <section className="edditAsset">
        <h1>Update your New Asset</h1>

        <form className="upload" onSubmit={this.handleFormSubmit}>
          <div className="upPart">
            <div>
              <input
                name="title"
                placeholder="Title"
                value={this.state.title}
                onChange={e => this.handleChange(e)}
              />
            </div>
            <div>
              <input
                name="price"
                type="number"
                placeholder="Price"
                value={this.state.price}
                onChange={e => this.handleChange(e)}
              />
            </div>
            <div>
              <textarea
                name="description"
                placeholder="Description"
                value={this.state.description}
                onChange={e => this.handleChange(e)}
              />
            </div>
          </div>
          <div className="lowPart">
            <div className="each">
              <label for="cover">Cover Image</label>
              <input
                className="file"
                name="cover"
                type="file"
                onChange={e => this.handleImgUpload(e)}
              />
            </div>
            <div className="each">
              <label for="model">Model File</label>
              <input
                className="file"
                name="model"
                required
                type="file"
                onChange={e => this.handleModelUpload(e)}
              />
            </div>
          </div>
          <div className="infernoPart">
            <button>Update It!</button>
          </div>
        </form>
      </section>
    );
  }
}
