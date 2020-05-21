import React, { Component } from "react";
// import { Redirect, Router } from "react-router-dom";
import NetworkDetector from "./Hoc/NetworkDetector";

import API from "./utils/API";

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
          console.log(`user in session`);
        } else {
          this.setState({ loggedIn: false, currentUser: null });
          console.log(`no user`);
        }
        console.log(sessionUser.data.user);
      })
      .catch(err => console.error(err));
  };

  changeUser = () => {
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      window.location.reload();
    }
    return (
      <Header
        changeUser={this.changeUser}
        loggedIn={this.state.loggedIn}
        currentUser={this.state.currentUser}
      />
    );
  }
}
export default NetworkDetector(App);
