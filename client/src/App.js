import React, { Component } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import NetworkDetector from "./Hoc/NetworkDetector";

import API from "./utils/API";

import Index from "./pages/Index";
import Home from "./pages/Home";

import Header from "./components/Header";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      loggedIn: false,
      currentUser: null,
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    API.getSessionUser()
      .then(sessionUser => {
        if (sessionUser.data.user) {
          this.setState({ loggedIn: true, currentUser: sessionUser.data.user });
        } else {
          this.setState({ loggedIn: false, currentUser: null });
        }
      })
      .catch(err => console.error(err));
  };

  changeUser = () => {
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      window.location.href = `/`;
    }
    return (
      <>
        <Header
          changeUser={this.changeUser}
          loggedIn={this.state.loggedIn}
          currentUser={this.state.currentUser}
        />
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Index
                  loggedIn={this.state.loggedIn}
                  currentUser={this.state.currentUser}
                />
              )}
            />
            <Route
              exact
              path="/home"
              render={() => (
                <Home
                  loggedIn={this.state.loggedIn}
                  currentUser={this.state.currentUser}
                />
              )}
            />
          </Switch>
        </Router>
      </>
    );
  }
}
export default NetworkDetector(App);
