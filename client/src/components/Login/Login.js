import React, { Component } from "react";
import AuthServices from "../../Services/Services";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", error : false};
    this.service = new AuthServices();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    this.service
      .login(username, password)
      .then(response => {
        console.log(response);
        this.setState({ username: "", password: "" });
        this.props.getUser(response);
      })
      .catch(error => { 
        console.log(error)
        this.setState({...this.state, error: true})
        });
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
            {
              this.state.error ? <p>Por favor, utiliza un usuario y contraseña correctos</p> : null
            } 
            
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
