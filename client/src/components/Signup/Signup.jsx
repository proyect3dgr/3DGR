import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthServices from "../../Services/Services";
import "../../SASS/Main.scss";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", email:"" };
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
          email:""
        });
        // this.props.getUser(response)
      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
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