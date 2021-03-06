import React, { Component } from "react";
import assetServices from "../../Services/assetServices";
import AuthServices from "../../Services/Services";
import { Redirect } from "react-router-dom";

export default class Settings extends Component {
  constructor() {
    super();
    this.state = {
      assetCollection: [],
      newPass: "",
      newPassRepeat: "",
      oldPass: "",
      about: "",
      avatar: "",
      secure_url: "",
      image: "",
      deleted: false,
      edited: false,
      uploaded: false
    };
    this.service = new assetServices();
    this.authService = new AuthServices();
  }

  getProfile = () => {
    const params = this.props.username;
    this.service.getUser(params).then(response => {
      this.setState(response);
    });
  };

  componentDidMount() {
    this.getProfile();
  }

  handleFormSubmitAvatar = event => {
    event.preventDefault();
    const image = this.state.image;

    this.authService
      .editAvatar(image)
      .then(response => {
        this.setState({ image: "", avatar: response.avatar });
        this.props.reloadUser();
      })
      .then(response => {
        this.setState({ edited: true });
      });
  };

  handleAboutSubmit = event => {
    event.preventDefault();

    const aboutMe = this.state.about;

    this.authService
      .editAbout(aboutMe)
      .then(response => {
        this.setState({ about: "" });
        this.props.reloadUser();
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

  handleFormSubmit = event => {
    event.preventDefault();

    const newPass = this.state.newPass;
    const oldPass = this.state.oldPass;
    const newPassRepeat = this.state.newPassRepeat;

    this.authService
      .editProfile(oldPass, newPass, newPassRepeat)
      .then(response => {
        this.setState({ oldPass: "", newPass: "", newPassRepeat: "" });
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

  handleFormDelete = (event, id) => {
    event.preventDefault();
    let commID = id;
    // console.log(commID)
    this.authService
      .deleteProfile(commID)
      .then(response => {
        this.props.reloadUser();
      })
      .then(response => {
        this.setState({ deleted: true });
      });
  };

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value });
    // console.log(this.state.about);
  };

  // this method handles just the file upload
  handleFileUpload = e => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);
    // console.log(e.target.files[0].size);
    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("avatar", e.target.files[0]);

    this.authService
      .handleUpload(uploadData)
      .then(response => {
        //console.log("response is: ", response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        this.setState({ image: response.secure_url });
      })
      .then(response => {
        console.log("miuau hola como estas?");
        this.setState({ uploaded: true });
        //console.log(this.state.uploaded )
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  };

  render() {
    if (this.state.deleted === true) {
      return <Redirect to="/" />;
    } else if (this.state.edited === true) {
      return <Redirect to={`/profile/${this.state.username}`} />;
    } else {
      return (
        <section className="settings">
          <h1>Settings</h1>
          <div className="upPart">
            <form className="password" onSubmit={this.handleFormSubmit}>
              <input
                name="oldPass"
                type="text"
                placeholder="Old Password"
                value={this.state.oldPass}
                onChange={e => this.handleChange(e)}
              />
              <input
                name="newPass"
                type="text"
                placeholder="New Password"
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

              <button>Change your Password!</button>
            </form>

            <form className="description" onSubmit={this.handleAboutSubmit}>
              <textarea
                name="about"
                onChange={e => this.handleChange(e)}
                value={this.state.about}
                placeholder="About me..."
              />

              <button>Change your Description!</button>
            </form>

            <form className="avatar" onSubmit={this.handleFormSubmitAvatar}>
              {/* <input
                name="image"
                type="text"
                placeholder="Choose Avatar URL"
                value={this.state.image}
                onChange={e => this.handleChange(e)}
              /> */}
              <input type="file" onChange={e => this.handleFileUpload(e)} />
              {this.state.uploaded === true ? (
                <button>Change your Avatar!</button>
              ) : (
                <button disabled>Change your Avatar!</button>
              )}
              {/* <button>Change your Avatar!</button> */}
            </form>
          </div>
          <div className="lowPart">
            <form
              className="deleteAccount"
              onSubmit={e => this.handleFormDelete(e, this.state._id)}
            >
              <button>Delete your account</button>
            </form>
            <p>(Only delete if you don't have any asset in your profile)</p>
          </div>
        </section>
      );
    }
  }
}
