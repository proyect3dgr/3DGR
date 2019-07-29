import React, { Component } from "react";
import assetServices from "../../Services/assetServices";
import AuthServices from "../../Services/Services";

export default class Settings extends Component {
  constructor() {
    super();
    this.state = {
      assetCollection: [],
      newPass: "",
      newPassRepeat: "",
      oldPass: "",
      avatar: "",
      secure_url: "",
      image: ""
    };
    this.service = new assetServices();
    this.authService = new AuthServices();
  }

  getProfile = () => {
    const params = this.props._id;
    this.service.getUser(params).then(response => {
      this.setState(response);
    });
  };

  componentDidMount() {
    this.getProfile();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state.image);
    const newPass = this.state.newPass;
    const oldPass = this.state.oldPass;
    const newPassRepeat = this.state.newPassRepeat;
    const image = this.state.image;

    if (!image) {
      this.authService
        .editProfile(oldPass, newPass, newPassRepeat)
        .then(response => {
          this.setState({ oldPass: "", newPass: "", newPassRepeat: "" });
        })
        .catch(error => {
          console.log(error);
          this.setState({
            ...this.state,
            error: true
          });
        });
    } else {
      this.authService.editAvatar(image).then(response => {
        this.setState({ avatar: response.avatar });
        console.log(response.avatar);
      });
    }
  };

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value });
    console.log(this.state.avatar);
  };

  // this method handles just the file upload
  handleFileUpload = e => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("avatar", e.target.files[0]);

    this.authService
      .handleUpload(uploadData)
      .then(response => {
        console.log("response is: ", response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        this.setState({ image: response.secure_url });
        console.log(this.state.image);
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  };

  render() {
    return (
      <section className="form">
        <h1>Settings</h1>
        <form onSubmit={this.handleFormSubmit}>
          <input
            name="oldPass"
            type="text"
            placeholder="Old password"
            value={this.state.oldPass}
            onChange={e => this.handleChange(e)}
          />
          <input
            name="newPass"
            type="text"
            placeholder="New password"
            value={this.state.newPass}
            onChange={e => this.handleChange(e)}
          />
          <input
            name="newPassRepeat"
            type="text"
            placeholder="Repeat New Password"
            value={this.state.newPassRepeat}
            onChange={e => this.handleChange(e)}
          />

          <button>Submit</button>
        </form>

        <form onSubmit={this.handleFormSubmit}>
          {/* <input
                name="image"
                type="text"
                placeholder="Choose Avatar URL"
                value={this.state.image}
                onChange={e => this.handleChange(e)}
              /> */}
          <input type="file" onChange={e => this.handleFileUpload(e)} />
          <button>Change avatar</button>
        </form>
      </section>
    );
  }
}
