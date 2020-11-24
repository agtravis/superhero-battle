import React, { Component } from "react";
import { Breakpoint } from "react-socks";

import "./style.css";

import colors from "../../config/colors";

import Credentials from "../Credentials";
import CredentialsMobile from "../CredentialsMobile";
import AppButton from "../AppButton";
import AppLink from "../AppLink";

import API from "../../utils/API";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ``,
      password: ``,
      showLogIn: false,
      showSignUp: false,
      showLogInMobile: false,
      showSignUpMobile: false,
      error: ``,
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
    API.findOneUserByName({ search: signInDetails.username })
      .then(data => {
        if (
          data.data.length > 0 &&
          signInDetails.username === data.data[0].username
        ) {
          this.setState({ error: `` });
          API.logIn(signInDetails)
            .then(() => {
              if (this.state.showLogIn) {
                this.showLogIn();
              }
              if (this.state.showSignUp) {
                this.showSignUp();
              }
              this.setState({
                showSignUpMobile: false,
                showLogInMobile: false,
              });
              this.props.changeUser();
            })
            .catch(err => console.error(err));
        } else {
          console.log(`failure`);
          this.setState({ error: `userdoesnotexist` });
        }
      })
      .catch(err => console.error(err));
  };

  logOut = () => {
    API.logOut()
      .then(() => this.props.changeUser())
      .catch(err => console.error(err));
  };

  resetCredentials = mode => {
    if (document.getElementById(`${mode}-username`)) {
      document.getElementById(`${mode}-username`).value = ``;
      document.getElementById(`${mode}-password`).value = ``;
    } else if (document.getElementById(`${mode}-username-mobile`)) {
      document.getElementById(`${mode}-username-mobile`).value = ``;
      document.getElementById(`${mode}-password-mobile`).value = ``;
    }
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
    setTimeout(() => {
      if (document.getElementById(`login-username`)) {
        document.getElementById(`login-username`).focus();
      }
    }, 500);
  };

  showLogInMobile = () => {
    if (this.state.showSignUpMobile) {
      this.setState({ showSignUpMobile: false });
    }
    this.setState({ showLogInMobile: !this.state.showLogInMobile });
  };

  showSignUpMobile = () => {
    if (this.state.showLogInMobile) {
      this.setState({ showLogInMobile: false });
    }
    this.setState({ showSignUpMobile: !this.state.showSignUpMobile });
  };

  showSignUp = () => {
    this.resetCredentials(`login`);
    if (this.state.showLogIn) {
      this.showLogIn();
      setTimeout(() => this.showSignUpLogic(), 400);
    } else {
      this.showSignUpLogic();
    }
    setTimeout(() => {
      if (document.getElementById(`signup-username`)) {
        document.getElementById(`signup-username`).focus();
      }
    }, 500);
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

  title = `Superhero Battle`;

  styles = {
    header: {
      backgroundColor: colors.primary,
      display: `flex`,
      justifyContent: `space-between`,
      alignItems: `center`,
      padding: `10px 20px`,
      position: `relative`,
      zIndex: 1,
    },
    headerTitleText: {
      fontFamily: `Impact, Charcoal, sans-serif`,
      color: colors.black,
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
                <h1 style={this.styles.headerTitleText}>{this.title}</h1>
              </Breakpoint>
              <Breakpoint small down>
                <h4 style={this.styles.headerTitleText}>{this.title}</h4>
              </Breakpoint>
            </a>
          </div>
          {!this.props.loggedIn ? (
            <div>
              <Breakpoint
                medium
                up
                style={{ display: `flex`, flexDirection: `row` }}
              >
                <AppButton onClick={() => this.showLogIn()}>Log In</AppButton>
                <div style={{ width: `10px` }}></div>
                <div style={{ padding: `2px` }}>
                  <AppLink onClick={() => this.showSignUp()}>Sign Up</AppLink>
                </div>
              </Breakpoint>
              <Breakpoint small down>
                <div
                  style={{
                    display: `flex`,
                    flexDirection: `row`,
                    paddingTop: `8px`,
                  }}
                >
                  <AppLink onClick={() => this.showLogInMobile()}>
                    Log In
                  </AppLink>
                  <div style={{ width: `10px` }}></div>
                  <AppLink onClick={() => this.showSignUpMobile()}>
                    Sign Up
                  </AppLink>
                </div>
              </Breakpoint>
            </div>
          ) : (
            <div>
              <p>
                Currently signed in: <em>{this.props.currentUser.username}</em>
              </p>
              <AppButton onClick={() => this.logOut()}>Log Out</AppButton>
            </div>
          )}
        </div>
        <Breakpoint medium up>
          <div id={`login`}>
            <Credentials
              error={this.state.error}
              handleSubmit={this.logInSubmit}
              handleChange={this.handleChange}
              close={this.showLogIn}
              buttonName={`Log In!`}
              id={`login`}
            />
          </div>
          <div id={`signup`}>
            <Credentials
              handleSubmit={this.newUserSubmit}
              handleChange={this.handleChange}
              close={this.showSignUp}
              buttonName={`Sign Up!`}
              id={`signup`}
            />
          </div>
        </Breakpoint>
        <Breakpoint small down>
          <div style={{ position: `relative` }}>
            {this.state.showLogInMobile && (
              <CredentialsMobile
                handleSubmit={this.logInSubmit}
                handleChange={this.handleChange}
                close={this.showLogInMobile}
                buttonName={`Log In!`}
                id={`login`}
              />
            )}
            {this.state.showSignUpMobile && (
              <CredentialsMobile
                handleSubmit={this.newUserSubmit}
                handleChange={this.handleChange}
                close={this.showSignUpMobile}
                buttonName={`Sign Up!`}
                id={`signup`}
              />
            )}
          </div>
        </Breakpoint>
      </div>
    );
  }
}

export default Header;
