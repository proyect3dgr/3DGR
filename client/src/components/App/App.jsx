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
import UploadAsset from "../UploadAsset/UploadAsset";
import Settings from "../Settings/Settings";
import EditAsset from "../EditAsset/EditAsset";
import Cart from "../Cart/Cart";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null
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
    this.service.checkLogin().then(response => {
      this.getTheUser(response);
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
          <Nav
            logout={this.logout}
            isProductList={this.state.isProductList}
            userLogged={this.state.loggedInUser}
          />

          <Switch>
            <Route
              exact
              path={`/profile/${this.state.loggedInUser.username}`}
              render={() => (
                <Profile
                  {...this.state.loggedInUser}
                  fetchUser={this.fetchUser}
                />
              )}
            />

<Route
              exact
              path="/editor"
              render={() => (<Editor></Editor>)
              }
            />

            <Route
              exact
              path="/(login|signup)/"
              render={() => {
                return (
                  <Redirect
                    to={`/profile/${this.state.loggedInUser.username}`}
                  />
                );
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
              path="/product/upload"
              render={() => (
                <UploadAsset user={this.state.loggedInUser.username} />
              )}
            />
            <Route
              exact
              path="/product/:id"
              render={props => (
                <ProductDetail {...props} {...this.state.loggedInUser} />
              )}
            />
            <Route
              exact
              path="/profile/settings"
              render={() => (
                <Settings
                  reloadUser={this.fetchUser}
                  {...this.state.loggedInUser}
                />
              )}
            />

            <Route
              exact
              path="/product-edit/:id"
              render={props => <EditAsset {...props} />}
            />

            <Route exact path="/cart" render={() => <Cart/>} />
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

        <Route exact path="/signup" render={() => <Signup />} />

        <Route
          exact
          path="/product/:id"
          render={props => <ProductDetail {...props} />}
        />
        <Route
          exact
          path="/profile/:id"
          render={() => {
            return <Redirect to="/login" />;
          }}
        />

        <Route
          exact
          path="/product/upload"
          render={() => {
            return <Redirect to="/login" />;
          }}
        />
      </React.Fragment>
    );
  }
}
