import React, { Component } from "react";
import ProductCard from "../ProductCard/ProductCard";
import assetServices from "../../Services/assetServices";
import Service from "../../Services/Services";

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      assetCollection: [],
      newPass: "",
      newPassRepeat: "",
      oldPass: "",
      image: ""
    };
    this.service = new assetServices();
    this.authService = new Service();
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
        this.setState({ image: "", avatar: response.avatar });
        console.log(response.avatar);
        this.props.fetchUser();
      });
    }
  };

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <React.Fragment>
        <section className="infoUser">
          <article>
            <img src={this.state.avatar} alt="avatar" />
            <h1>{this.props.username}</h1>
            <p>{this.props.about}</p>

            <p>{this.props.email}</p>

            {/* <button
              onClick={e => {
                this.props.logout(e);
              }}
            >
              LOGOUT
            </button> */}
          </article>
          <section className="statistics">
            <h1>Statistics</h1>
            <form onSubmit={this.handleFormSubmit}>
              <input
                name="oldPass"
                placeholder="Old password"
                value={this.state.oldPass}
                onChange={e => this.handleChange(e)}
              />
              <input
                name="newPass"
                placeholder="New password"
                value={this.state.newPass}
                onChange={e => this.handleChange(e)}
              />
              <input
                name="newPassRepeat"
                placeholder="Repeat New Password"
                value={this.state.newPassRepeat}
                onChange={e => this.handleChange(e)}
              />

              <button>Submit</button>
            </form>

            <form onSubmit={this.handleFormSubmit}>
              <input
                name="image"
                placeholder="Choose Avatar URL"
                value={this.state.image}
                onChange={e => this.handleChange(e)}
              />
              <button>Change avatar</button>
            </form>
          </section>
        </section>

        <div className="lowPart">
          <section className="collection">
            <h1>Collection</h1>
            <ul>
              {this.state.assetCollection.map((asset, idx) => (
                <li key={idx}>
                  <ProductCard className="cocowawa" {...asset} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </React.Fragment>
    );
  }
}
