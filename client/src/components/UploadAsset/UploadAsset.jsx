import React, { Component } from "react";
import assetServices from "../../Services/assetServices";
import {Redirect} from "react-router-dom"


export default class UploadAsset extends Component {
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
      modelUploaded: false,
    };
    this.service = new assetServices();
  }
  //HAcer que se actualice al crear nuevo asset con el
  //setAsset
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
        }).then(response => {
          this.setState({created:true})
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
        }).then(response => {
          this.setState({created:true})
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
      }).then(response => {
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
        })
      }).then(response => {
        this.setState({ modelUploaded: true });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  };

  render() {
    if (this.state.created === true) {
      return <Redirect to={`/profile/${this.props.user}`} />;
    } else {
      return (
        <form onSubmit={this.handleFormSubmit}>
          <input
            name="title"
            placeholder="title"
            value={this.state.title}
            onChange={e => this.handleChange(e)}
          />
          <input
            name="price"
            placeholder="price"
            value={this.state.price}
            onChange={e => this.handleChange(e)}
          />
          <textarea
            name="description"
            placeholder="description"
            value={this.state.description}
            onChange={e => this.handleChange(e)}
          />

          <input type="file" onChange={e => this.handleImgUpload(e)} />

          <input
            required
            type="file"
            onChange={e => this.handleModelUpload(e)}
          />

          <button>Submit</button>
        </form>
      );
    }
  }
}
