import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthServices from "../../Services/Services";
import "../../SASS/Main.scss";
import {Redirect} from "react-router-dom"


export default class Signup extends Component {
  constructor() {
    super();
    this.state = { username: "", password: "", email: "", didSignUp: false };
    this.service = new AuthServices();
    this.errMessage = "";
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const email = this.state.email;

    this.service
      .signup(username, password, email)
      .then(response => {
        console.log(response);
        this.errMessage = response.message;

        this.setState({
          username: "",
          password: "",
          email: ""
        })

        // this.props.getUser(response)
      }).then(response => {
        this.setState({didSignUp:true})

      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    console.log(this.state.username);
    console.log(this.state.password);
  };

  render() {
    if (this.state.didSignUp === true) {
      return <Redirect to="/login" />;
    } else {
      return (
        <div className="form">
          <form onSubmit={this.handleFormSubmit}>
            <div>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={this.state.username}
                onChange={e => this.handleChange(e)}
              />
            </div>

            <div>
              <input
                name="email"
                type="email"
                placeholder="email"
                value={this.state.email}
                onChange={e => this.handleChange(e)}
              />
            </div>

            <div>
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={e => this.handleChange(e)}
              />
            </div>

            <div>
              <p>{this.errMessage}</p>
            </div>

            <div>
              <button type="submit" value="Signup">
                Signup
              </button>
            </div>
          </form>

          <div>
            <p>
              Already have account?
              <Link to={"/login"}> Login</Link>
            </p>
          </div>
        </div>
      );
    }
  }
}
