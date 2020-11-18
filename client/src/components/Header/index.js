import React, { Component } from "react";

import colors from "../../config/colors";

import Credentials from "../Credentials";

import API from "../../utils/API";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ``,
      password: ``,
      signUpMode: false,
      modalType: ``,
    };
  }

  handleChange = (event, stateKey) => {
    this.setState({ [stateKey]: event.target.value });
  };

  logInSubmit = event => {
    event.preventDefault();
    const userDetails = {
      username: this.state.username,
      password: this.state.password,
    };
    this.resetCredentials();
    this.logIn(userDetails);
  };

  newUserSubmit = event => {
    event.preventDefault();
    const userDetails = {
      username: this.state.username,
      password: this.state.password,
    };
    this.resetCredentials();
    this.signUpUser(userDetails);
  };

  signUpUser = signUpDetails => {
    API.newUser(signUpDetails)
      .then(() => {
        this.logIn(signUpDetails);
      })
      .catch(err => console.error(err));
  };

  logIn = signInDetails => {
    API.logIn(signInDetails)
      .then(() => {
        this.setState({ modalType: `` });
        this.props.changeUser();
      })
      .catch(err => console.error(err));
  };

  logOut = () => {
    API.logOut()
      .then(() => this.props.changeUser())
      .catch(err => console.error(err));
  };

  resetCredentials = () => {
    document.getElementById(`username`).value = ``;
    document.getElementById(`password`).value = ``;
    this.setState({ username: ``, password: `` });
  };

  showModal = type => {
    this.state.modalType === type
      ? this.setState({ modalType: `` })
      : this.setState({ modalType: type });
  };

  styles = {
    header: {
      backgroundColor: colors.primary,
      display: `flex`,
      justifyContent: `space-between`,
      padding: `10px 20px`,
    },
    headerTitleText: {
      color: colors.black,
    },
  };

  render() {
    return (
      <div style={this.styles.header}>
        <div>
          <img
            src={`/spiderman_mcfarlane.png`}
            alt={`spider-man`}
            height={120}
          />
        </div>
        <div>
          <a
            href="/"
            style={{
              textDecoration: `none`,
              color: `black`,
            }}
          >
            <h1 style={this.styles.headerTitleText}>Superhero Battle</h1>
          </a>
        </div>
        <div>
          {!this.props.loggedIn ? (
            <div>
              <p>
                <span
                  style={{
                    textDecoration: `underline`,
                    color: `blue`,
                    cursor: `pointer`,
                  }}
                  onClick={() => this.showModal(`login`)}
                >
                  Log in
                </span>{" "}
                <span
                  style={{
                    textDecoration: `underline`,
                    color: `blue`,
                    cursor: `pointer`,
                  }}
                  onClick={() => this.showModal(`signup`)}
                >
                  Sign up
                </span>
              </p>
              {this.state.modalType === `signup` && (
                <Credentials
                  handleSubmit={this.newUserSubmit}
                  handleChange={this.handleChange}
                  buttonName={`Sign Up!`}
                />
              )}
              {this.state.modalType === `login` && (
                <Credentials
                  handleSubmit={this.logInSubmit}
                  handleChange={this.handleChange}
                  buttonName={`Log In!`}
                />
              )}
            </div>
          ) : (
            <div>
              <p>
                Currently signed in: <em>{this.props.currentUser.username}</em>
              </p>
              <button onClick={() => this.logOut()}>Log Out</button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Header;
