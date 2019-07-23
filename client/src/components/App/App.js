import React, { Component } from "react";

import "../../SASS/Main.scss";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import Profile from "../Profile/Profile";
import AuthServices from "../../Services/Services";
import ProductList from "../ProductList/ProductList";
import ProductDetail from "../ProductDetail/ProductDetail";

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
    this.service.loggedin().then(response => {
      this.setState({
        loggedInUser: response
      });
    });
  };

  render() {
return(

  <ProductDetail></ProductDetail>
)
  //   if (this.state.loggedInUser) {
  //     return (
  //       <React.Fragment>
  //          <section className="slider">SLIDER</section>
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