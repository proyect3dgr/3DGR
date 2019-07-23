import React from "react";
import ReactDOM from "react-dom";
import './SASS/Main.scss';
import App from "./components/App/App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import Nav from "./components/Nav/Nav";

ReactDOM.render(
  <Router>
    <Nav/>
    <App router={Router} />
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
