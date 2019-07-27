import React, { Component } from 'react'
import assetServices from '../../Services/assetServices';
import AuthServices from '../../Services/Services';

export default class Settings extends Component {
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
              <input
                name="image"
                type="text"
                placeholder="Choose Avatar URL"
                value={this.state.image}
                onChange={e => this.handleChange(e)}
              />
              </form>
              


              <button>Change avatar</button>
              </section>
        )
    }
}
