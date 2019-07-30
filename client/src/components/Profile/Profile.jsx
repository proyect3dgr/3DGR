import React, { Component } from "react";
import ProductCard from "../ProductCard/ProductCard";
import assetServices from "../../Services/assetServices";
import Service from "../../Services/Services";
import edit from "./edit-button.svg";
import { Link } from "react-router-dom";
import bin from "../CommentList/bin.png"


export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assetCollection: [],
      newPass: "",
      newPassRepeat: "",
      oldPass: "",
      image: "",
      about: this.props.about
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

  handleFormDelete = (event, id) => {
    event.preventDefault();
    let commID = id;

    this.service.deleteAsset(commID).then(response => {
      this.getProfile();
    });
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
            <div className="userAvatar">
              <img src={this.state.avatar} alt="avatar" />
            </div>

            <div className="details">
              <h1>{this.props.username}</h1>
              <h2>{this.props.email}</h2>
            </div>

            <div className="description">
              <p className="title">About Me</p>
              <p>{this.props.about}</p>
              <Link to={"/profile/settings"}>
                <div className="edit"><img src={edit} alt="edit" /></div>
              </Link>
            </div>

            {/* <button
              onClick={e => {
                this.props.logout(e);
              }}
            >
              LOGOUT
            </button> */}
          </article>
        </section>

        <div className="lowPart">
          <section className="collection">
            <ul>
              {this.state.assetCollection.map((asset, idx) => (
                <li key={idx}>
                  <form onSubmit={e => this.handleFormDelete(e, asset._id)}>
                  <button className="deleteBtn"><img src={bin} alt="delete button"></img></button>
                  <Link to={`/product-edit/${asset._id}`}><button className="edit"><img src={edit} alt="delete button"></img></button></Link>

                </form>
                  <ProductCard {...asset} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </React.Fragment>
    );
  }
}
