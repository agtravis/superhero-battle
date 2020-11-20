import React, { Component } from "react";
import { Spring, Transition, animated } from "react-spring/renderprops";

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

  toggle = type => {
    if (type === `login` && !this.state.showLogIn) {
      if (!this.state.showSignUp) {
        this.setState({ showLogIn: true });
      } else {
        this.setState({ showSignUp: false });
        setTimeout(() => this.setState({ showLogIn: true }), 1100);
      }
    } else if (type === `login` && this.state.showLogIn) {
      this.setState({ showLogIn: false });
    } else if (type === `signup` && !this.state.showSignUp) {
      if (!this.state.showLogIn) {
        this.setState({ showSignUp: true });
      } else {
        this.setState({ showLogIn: false });
        setTimeout(() => this.setState({ showSignUp: true }), 1100);
      }
    } else if (type === `signup` && this.state.showSignUp) {
      this.setState({ showSignUp: false });
    } else {
      console.log(`nothing`);
    }
  };

  styles = {
    header: {
      backgroundColor: colors.primary,
      display: `flex`,
      justifyContent: `space-between`,
      // marginBottom: `50px`,
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
      <div>
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
          {!this.props.loggedIn ? (
            <div>
              <p>
                <button
                  style={this.styles.signUpLogInLink}
                  value={`login`}
                  onClick={() => this.toggle(`login`)}
                >
                  Log in
                </button>{" "}
                <button
                  style={this.styles.signUpLogInLink}
                  onClick={() => this.toggle(`signup`)}
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
        <div>
          <div>
            <Spring
              native
              force
              config={{ tension: 2000, friction: 100, precision: 1 }}
              from={{
                marginTop: this.state.showSignUp ? -50 : 0,
                opacity: this.state.showSignUp ? 0 : 1,
              }}
              to={{
                marginTop: this.state.showSignUp ? 0 : -50,
                opacity: this.state.showSignUp ? 1 : 0,
              }}
            >
              {props => (
                <animated.div style={props}>
                  <Credentials
                    handleSubmit={this.newUserSubmit}
                    handleChange={this.handleChange}
                    buttonName={`Sign Up!`}
                  />
                </animated.div>
              )}
            </Spring>
            <Spring
              native
              force
              config={{ tension: 2000, friction: 100, precision: 1 }}
              from={{
                marginTop: this.state.showLogIn ? -50 : 0,
                opacity: this.state.showLogIn ? 0 : 1,
              }}
              to={{
                marginTop: this.state.showLogIn ? 0 : -50,
                opacity: this.state.showLogIn ? 1 : 0,
              }}
            >
              {props => (
                <animated.div style={props}>
                  <Credentials
                    handleSubmit={this.logInSubmit}
                    handleChange={this.handleChange}
                    buttonName={`Log In!`}
                  />
                </animated.div>
              )}
            </Spring>
            {/*<Transition
              native
              items={this.state.showSignUp}
              from={{ marginTop: -150 }}
              enter={{ marginTop: 0 }}
              leave={{ marginTop: -150 }}
            >
              {show =>
                show &&
                (props => (
                  <animated.div style={props}>
                    <Credentials
                      handleSubmit={this.newUserSubmit}
                      handleChange={this.handleChange}
                      buttonName={`Sign Up!`}
                    />
                  </animated.div>
                ))
              }
            </Transition>*/}
            {/*<Transition
              native
              items={this.state.showLogIn}
              from={{ marginTop: -150 }}
              enter={{ marginTop: 0 }}
              leave={{ marginTop: -150 }}
            >
              {show =>
                show &&
                (props => (
                  <animated.div style={props}>
                    <Credentials
                      handleSubmit={this.logInSubmit}
                      handleChange={this.handleChange}
                      buttonName={`Log In!`}
                    />
                  </animated.div>
                ))
              }
            </Transition>*/}
            {/*{this.state.showSignUp && (
              <Credentials
                handleSubmit={this.newUserSubmit}
                handleChange={this.handleChange}
                buttonName={`Sign Up!`}
            />
            )}
            {this.state.showLogIn && (
              <Credentials
                handleSubmit={this.logInSubmit}
                handleChange={this.handleChange}
                buttonName={`Log In!`}
              />
            )}*/}
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
