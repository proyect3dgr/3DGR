import React, { Component } from "react";
import assetServices from "../../Services/assetServices";
import { Redirect } from "react-router-dom";


export default class EditAsset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      title: "",
      price: "",
      description: "",
      image: "",
      model: "",
      size: "",
      edited: false,
      imgUploaded: false,
      modelUploaded: false
    };
    this.service = new assetServices();
  }

  componentDidMount() {
    this.getAsset();
    console.log(this.props)
  }

  getAsset() {
    const params = this.props.match.params.id;

    this.service.getAsset(params).then(response => {
      this.setState({
        ...this.state,
        ...response
      });
    });
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const title = this.state.title;
    const price = this.state.price;
    const description = this.state.description;
    const params = this.props.match.params.id;

    this.service
      .editAsset(params, title, price, description)
      .then(response => {
        this.setState({
          title: "",
          price: "",
          description: ""
        });
      })
      .then(response => {
        this.setState({ edited: true });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          ...this.state,
          error: true
        });
      });
  };

  handleFormImage = event => {
    event.preventDefault();
    const image = this.state.image;
    const params = this.props.match.params.id;

    console.log(image);
    console.log(params);

    this.service
      .editAssetImg(params, image)
      .then(response => {
        this.setState({
          image: ""
        });
      })
      .then(response => {
        this.setState({ edited: true });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          ...this.state,
          error: true
        });
      });
  };

  handleFormModel = event => {
    event.preventDefault();
    const model = this.state.model;
    const size = this.state.size;
    const params = this.props.match.params.id;

    this.service
      .editAssetModel(params, model, size)
      .then(response => {
        this.setState({
          model: "",
          size: ""
        });
      })
      .then(response => {
        this.setState({ edited: true });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          ...this.state,
          error: true
        });
      });
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
    if(this.state.edited === true) { return (<Redirect to={`/product/${this.props.match.params.id}`}/>)}
    return (
      <section className="edditAsset">
        <h1>Update your Asset</h1>

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
          <div className="infernoPart">
            <button>Update Them!</button>
          </div>
        </form>
        
        <div className="lowPart">

          
            <form onSubmit={this.handleFormImage}>
              <label htmlFor="cover">Preview Image</label>
              <input
                className="file"
                name="cover"
                type="file"
                onChange={e => this.handleImgUpload(e)}
              />
            {this.state.imgUploaded ? <button>Upload It!</button> : <button disabled>Upload It!</button>}
            </form>
          
          
            <form onSubmit={this.handleFormModel}>
              <label htmlFor="model">Model File</label>
              <input
                className="file"
                name="model"
                // required
                type="file"
                onChange={e => this.handleModelUpload(e)}
              />
            {this.state.modelUploaded ? <button>Upload It!</button> : <button disabled>Upload It!</button>}
            </form>
          </div>
        
      </section>
    );
  }
}
