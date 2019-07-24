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

  userCreated

  render() {
    if (this.state.loggedInUser) {
      return (
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
        </Switch>
      );
    }

    return (
      <React.Fragment>
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

      </React.Fragment>
    );

    //   if (this.state.loggedInUser) {
    //     return (
    //       <React.Fragment>
    //
    //         <Switch>
    //           <Route
    //             exact
    //             path="/login"
    //             render={() => {
    //               return <Redirect to="/profile" />;
    //             }}
    //           />
    //           <Route
    //             exact
    //             path="/profile"
    //             render={() => (
    //               <Profile {...this.state.loggedInUser} logout={this.logout} />
    //             )}
    //           />
    //         </Switch>
    //       </React.Fragment>
    //     );
    //   } else {
    //     return (
    //       <React.Fragment>
    //         <Switch>

    //           <Route
    //             exact
    //             path="/login"
    //             render={() => (
    //               <Login {...this.state.loggedInUser} getUser={this.getTheUser} />
    //             )}
    //           />
    //           <Route
    //             exact
    //             path="/signup"
    //             render={() => <Signup {...this.state.loggedInUser} />}
    //           />
    //           <Route
    //             render={() => {
    //               return <Redirect to="/login" />;
    //             }}
    //           />
    //         </Switch>
    //       </React.Fragment>
    //     );
    //   }
    // }
  }
}
