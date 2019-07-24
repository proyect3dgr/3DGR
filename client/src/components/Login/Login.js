import React, { Component } from "react";
import AuthServices from "../../Services/Services";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    this.service = new AuthServices();
    this.errMessage = "";
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    this.service
      .login(username, password)
      .then(response => {
        //console.log(response);
        this.errMessage = response.message;
        this.setState({ username: "", password: "" });
        this.props.getUser(response);
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
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={e => this.handleChange(e)}
            />
          </div>

          <div>
            <p>{this.errMessage}</p>
          </div>

          <div>
            <button type="submit" value="Login">
              Login
            </button>
          </div>
        </form>
        <div>
          <p>
            Don't have account?
            <Link to={"/signup"}> Signup</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default Login;
