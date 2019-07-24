import React, { Component } from "react";

import "../../SASS/Main.scss";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import Slider from "../Slider/Slider";
import Profile from "../Profile/Profile";
import AuthServices from "../../Services/Services";
import ProductList from "../ProductList/ProductList";
import ProductDetail from "../ProductDetail/ProductDetail";
import Nav from "../Nav/Nav";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null,
      userCreated: false
    };
    this.service = new AuthServices();
  }

  getTheUser = userObj => {
    this.setState({ ...this.state, loggedInUser: userObj });
  };

  logout = e => {
    e.preventDefault();
    this.service.logout().then(() => {
      this.setState({
        loggedInUser: null
      });
    });
  };

  fetchUser = () => {
    this.service.loggedin().then(response => {
      this.setState({
        loggedInUser: response
      });
    });
  };

  componentDidMount() {
    this.service.checkLogin().then(response => {
      this.getTheUser(response);
    });
  }

  render() {
    if (this.state.loggedInUser) {
      return (
        <React.Fragment>
          <Nav userLogged={this.state.loggedInUser} />
          <Switch>
            <Route
              exact
              path="/Profile"
              render={() => (
                <Profile {...this.state.loggedInUser} logout={this.logout} />
              )}
            />

            <Route
              exact
              path="/(login|signup)/"
              render={() => {
                return <Redirect to="/profile" />;
              }}
            />

            <Route
              exact
              path="/"
              render={() => (
                <React.Fragment>
                  <Slider />
                  <ProductList />
                </React.Fragment>
              )}
            />

            <Route
              exact
              path="/product/detail"
              render={() => <ProductDetail />}
            />
          </Switch>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Nav />
        <Route
          exact
          path="/"
          render={() => (
            <React.Fragment>
              <Slider />
              <ProductList />
            </React.Fragment>
          )}
        />

        <Route
          exact
          path="/login"
          render={() => (
            <Login {...this.state.loggedInUser} getUser={this.getTheUser} />
          )}
        />

        <Route
          exact
          path="/signup"
          render={() => <Signup {...this.state.loggedInUser} />}
        />

        <Route exact path="/product/detail" render={() => <ProductDetail />} />

        <Route
          exact
          path="/profile"
          render={() => {
            return <Redirect to="/login" />;
          }}
        />
      </React.Fragment>
    );
  }
}
