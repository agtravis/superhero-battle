import React, { Component } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import NetworkDetector from "./Hoc/NetworkDetector";

import API from "./utils/API";

import Index from "./pages/Index";
import Home from "./pages/Home";
import Roster from "./pages/Roster";

import Header from "./components/Header";
import NavBar from "./components/NavBar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      loggedIn: false,
      currentUser: null,
      userDetails: null,
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
          this.fillUser();
        } else {
          this.setState({
            loggedIn: false,
            currentUser: null,
            userDetails: null,
          });
        }
      })
      .catch(err => console.error(err));
  };

  fillUser = () => {
    API.getUserDetails(this.state.currentUser._id)
      .then(dbUser => {
        console.log(dbUser.data);
        this.setState({ userDetails: dbUser.data });
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
          <NavBar loggedIn={this.state.loggedIn} />
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
              path="/roster"
              render={() => (
                <Roster
                  loggedIn={this.state.loggedIn}
                  currentUser={this.state.userDetails}
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
