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
      loggedInUser: null,
      cart: []
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

  addToCart(movie) {
    let newState = { ...this.state };

    newState.cart.push(movie);

    this.setState(newState);

    console.log(newState.cart);
  }

  getCartTotal() {
    return this.state.cart.reduce((ac, cu) => ac + cu.price, 0);
  }

  emptyCart() {
    let newState = {...this.state, cart:[]}
    this.setState(newState)
  }

  removeProductFromBasket(modelID) {
    let newState = { ...this.state };
    let cartItemIndex = 0;

    for (var i = 0; i < newState.cart.length; i++) {
      if (newState.cart[i].id === modelID) {
        cartItemIndex = i;
      }
    }
    newState.cart.splice(cartItemIndex, 1);

    this.setState(newState);
  }

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
                <ProductDetail
                  {...props}
                  {...this.state.loggedInUser}
                  addToCart={model => this.addToCart(model)}
                />
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

            <Route
              exact
              path="/cart"
              render={() => (
                <Cart
                  cart={this.state.cart}
                  getCartTotal={() => this.getCartTotal()}
                  removeProductFromBasket={modelID =>
                    this.removeProductFromBasket(modelID)
                  }
                  emptyCart={() => this.emptyCart()}
                />
              )}
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
