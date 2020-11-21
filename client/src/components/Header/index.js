import React, { Component } from "react";
import { Breakpoint } from "react-socks";

import "./style.css";

import colors from "../../config/colors";

import Credentials from "../Credentials";

import API from "../../utils/API";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ``,
      password: ``,
      showLogIn: false,
      showSignUp: false,
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
    this.resetCredentials(`login`);
    this.logIn(userDetails);
  };

  newUserSubmit = event => {
    event.preventDefault();
    const userDetails = {
      username: this.state.username,
      password: this.state.password,
    };
    this.resetCredentials(`signup`);
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

  resetCredentials = mode => {
    document.getElementById(`${mode}-username`).value = ``;
    document.getElementById(`${mode}-password`).value = ``;
    this.setState({ username: ``, password: `` });
  };

  showLogIn = () => {
    this.resetCredentials(`signup`);
    if (this.state.showSignUp) {
      this.showSignUp();
      setTimeout(() => this.showLogInLogic(), 400);
    } else {
      this.showLogInLogic();
    }
  };

  showSignUp = () => {
    this.resetCredentials(`login`);
    if (this.state.showLogIn) {
      this.showLogIn();
      setTimeout(() => this.showSignUpLogic(), 400);
    } else {
      this.showSignUpLogic();
    }
  };

  showLogInLogic = () => {
    if (!this.state.showLogIn) {
      document
        .getElementsByClassName(`login-form`)[0]
        .classList.remove(`translateBack`);
      document
        .getElementsByClassName(`login-form`)[0]
        .classList.add(`translate`);
    } else {
      document
        .getElementsByClassName(`login-form`)[0]
        .classList.remove(`translate`);
      document
        .getElementsByClassName(`login-form`)[0]
        .classList.add(`translateBack`);
    }
    this.setState({ showLogIn: !this.state.showLogIn });
  };

  showSignUpLogic = () => {
    if (!this.state.showSignUp) {
      document
        .getElementsByClassName(`signup-form`)[0]
        .classList.remove(`translateBack`);
      document
        .getElementsByClassName(`signup-form`)[0]
        .classList.add(`translate`);
    } else {
      document
        .getElementsByClassName(`signup-form`)[0]
        .classList.remove(`translate`);
      document
        .getElementsByClassName(`signup-form`)[0]
        .classList.add(`translateBack`);
    }
    this.setState({ showSignUp: !this.state.showSignUp });
  };

  styles = {
    header: {
      backgroundColor: colors.primary,
      display: `flex`,
      justifyContent: `space-between`,
      padding: `10px 20px`,
      position: `relative`,
      zIndex: 1,
    },
    headerTitleText: {
      color: colors.black,
    },
    signUpLogInLink: {
      textDecoration: `underline`,
      color: `blue`,
      cursor: `pointer`,
    },
  };

  render() {
    return (
      <div id={`header-container`}>
        <div style={this.styles.header}>
          <div>
            <Breakpoint medium up>
              <img
                src={`/spiderman_mcfarlane.png`}
                alt={`spider-man`}
                height={120}
              />
            </Breakpoint>
          </div>
          <div>
            <a
              href="/"
              style={{
                textDecoration: `none`,
                color: `black`,
              }}
            >
              <Breakpoint medium up>
                <h1 style={this.styles.headerTitleText} id={`title`}>
                  Superhero Battle
                </h1>
              </Breakpoint>
              <Breakpoint small down>
                <h4 style={this.styles.headerTitleText} id={`title`}>
                  Superhero Battle
                </h4>
              </Breakpoint>
            </a>
          </div>
          {!this.props.loggedIn ? (
            <div>
              <p>
                <button
                  style={this.styles.signUpLogInLink}
                  value={`login`}
                  onClick={() => this.showLogIn()}
                >
                  Log in
                </button>{" "}
                <button
                  style={this.styles.signUpLogInLink}
                  onClick={() => this.showSignUp()}
                >
                  Sign up
                </button>
              </p>
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
        <div id={`login`}>
          <Credentials
            handleSubmit={this.logInSubmit}
            handleChange={this.handleChange}
            buttonName={`Log In!`}
            id={`login`}
          />
        </div>
        <div id={`signup`}>
          <Credentials
            handleSubmit={this.newUserSubmit}
            handleChange={this.handleChange}
            buttonName={`Sign Up!`}
            id={`signup`}
          />
        </div>
      </div>
    );
  }
}

export default Header;
