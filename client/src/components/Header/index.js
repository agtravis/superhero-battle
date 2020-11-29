import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Breakpoint } from "react-socks";

import "./style.css";

import colors from "../../config/colors";

import Credentials from "../Credentials";
import CredentialsMobile from "../CredentialsMobile";
import AppButton from "../AppButton";
import AppLink from "../AppLink";

import API from "../../utils/API";

import { FaBars, FaInfoCircle } from "react-icons/fa";

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
      showNav: false,
      error: ``,
      fieldIncomplete: ``,
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
    this.logIn(userDetails);
  };

  newUserSubmit = event => {
    event.preventDefault();
    const userDetails = {
      username: this.state.username,
      password: this.state.password,
    };
    this.signUpUser(userDetails);
  };

  signUpUser = signUpDetails => {
    this.setState({ error: ``, fieldIncomplete: `` });
    if (signUpDetails.username.length === 0) {
      this.setState({ fieldIncomplete: `nousername` });
      const username = document.getElementById(`signup-username`)
        ? document.getElementById(`signup-username`)
        : document.getElementById(`signup-username-mobile`);
      username.focus();
    } else if (signUpDetails.password.length < 4) {
      // } else if (
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/.test(
      //     signUpDetails.password
      //   ) === false
      // ) {
      this.setState({ error: `regexfail` });
      const password = document.getElementById(`signup-password`)
        ? document.getElementById(`signup-password`)
        : document.getElementById(`signup-password-mobile`);
      password.value = ``;
      password.focus();
    } else {
      API.findOneUserByName({ search: signUpDetails.username }).then(data => {
        if (
          data.data.length > 0 &&
          signUpDetails.username === data.data[0].username
        ) {
          this.setState({ error: `useralreadyexists` });
          const username = document.getElementById(`signup-username`)
            ? document.getElementById(`signup-username`)
            : document.getElementById(`signup-username-mobile`);
          const password = document.getElementById(`signup-password`)
            ? document.getElementById(`signup-password`)
            : document.getElementById(`signup-password-mobile`);
          password.value = ``;
          this.setState({ password: `` });
          username.focus();
        } else {
          API.newUser(signUpDetails)
            .then(() => {
              this.resetCredentials(`signup`);
              this.logIn(signUpDetails);
            })
            .catch(err => console.error(err));
        }
      });
    }
  };

  logIn = signInDetails => {
    this.setState({ error: ``, fieldIncomplete: `` });
    if (signInDetails.username.length === 0) {
      this.setState({ fieldIncomplete: `nousername` });
      const username = document.getElementById(`login-username`)
        ? document.getElementById(`login-username`)
        : document.getElementById(`login-username-mobile`);
      username.focus();
    } else if (signInDetails.password.length === 0) {
      this.setState({ fieldIncomplete: `nopassword` });
      const password = document.getElementById(`login-password`)
        ? document.getElementById(`login-password`)
        : document.getElementById(`login-password-mobile`);
      password.focus();
    } else {
      API.findOneUserByName({ search: signInDetails.username })
        .then(data => {
          if (
            data.data.length > 0 &&
            signInDetails.username === data.data[0].username
          ) {
            this.setState({ error: `` });
            API.logIn(signInDetails)
              .then(response => {
                if (response.status === 200) {
                  this.setState({ error: `` });
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
                  this.resetCredentials(`login`);
                  this.props.changeUser();
                }
              })
              .catch(err => {
                this.setState({ error: `passworddoesnotmatch` });
                const password = document.getElementById(`login-password`)
                  ? document.getElementById(`login-password`)
                  : document.getElementById(`login-password-mobile`);
                password.value = ``;
                password.focus();
              });
          } else {
            this.setState({ error: `userdoesnotexist` });
            const username = document.getElementById(`login-username`)
              ? document.getElementById(`login-username`)
              : document.getElementById(`login-username-mobile`);
            username.focus();
          }
        })
        .catch(err => console.error(err));
    }
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
    this.setState({
      username: ``,
      password: ``,
      error: ``,
      fieldIncomplete: ``,
    });
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

  slideBody = isCredentialsShowing => {
    const body = document.getElementsByClassName(`main-body`)[0];
    if (!isCredentialsShowing) {
      body.classList.remove(`translateBodyBack`);
      body.classList.add(`translateBody`);
    } else {
      body.classList.add(`translateBodyBack`);
      body.classList.remove(`translateBody`);
    }
  };

  showLogInLogic = () => {
    const logInForm = document.getElementsByClassName(`login-form`)[0];
    if (!this.state.showLogIn) {
      logInForm.classList.remove(`translateBack`);
      logInForm.classList.add(`translate`);
      this.slideBody(false);
    } else {
      logInForm.classList.remove(`translate`);
      logInForm.classList.add(`translateBack`);
      this.slideBody(true);
    }
    this.setState({ showLogIn: !this.state.showLogIn });
  };

  showSignUpLogic = () => {
    const signUpForm = document.getElementsByClassName(`signup-form`)[0];
    if (!this.state.showSignUp) {
      signUpForm.classList.remove(`translateBack`);
      signUpForm.classList.add(`translate`);
      this.slideBody(false);
    } else {
      signUpForm.classList.remove(`translate`);
      signUpForm.classList.add(`translateBack`);
      this.slideBody(true);
    }
    this.setState({ showSignUp: !this.state.showSignUp });
  };

  showNav = () => {
    if (document.getElementsByClassName(`nav-mobile`)[0]) {
      const navMobile = document.getElementsByClassName(`nav-mobile`)[0];
      if (!navMobile.classList.contains(`translateNavMobile`)) {
        navMobile.classList.add(`translateNavMobile`);
        navMobile.classList.remove(`translateNavMobileBack`);
      } else {
        navMobile.classList.add(`translateNavMobileBack`);
        navMobile.classList.remove(`translateNavMobile`);
      }
    }
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
            <Breakpoint medium up>
              <h1 style={this.styles.headerTitleText}>{this.title}</h1>
            </Breakpoint>
            <Breakpoint small down>
              <div id={`header-and-menu`} style={{ position: `relative` }}>
                {this.props.loggedIn && (
                  <div
                    onClick={this.showNav}
                    style={{ position: `absolute`, left: `-40%` }}
                  >
                    <FaBars />
                  </div>
                )}
                {!this.props.loggedIn && (
                  <div style={{ position: `absolute`, left: `-12.5%` }}>
                    <Link
                      to={
                        this.props.location.pathname === `/about`
                          ? `/`
                          : `/about`
                      }
                    >
                      <FaInfoCircle color={colors.black} />
                    </Link>
                  </div>
                )}
                <div>
                  <h4 style={this.styles.headerTitleText}>{this.title}</h4>
                </div>
              </div>
            </Breakpoint>
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
              <Breakpoint medium up>
                <p>
                  <em>{this.props.currentUser.username}</em>
                </p>
                <div style={{ display: `flex`, justifyContent: `flex-end` }}>
                  <AppButton onClick={() => this.logOut()}>Log Out</AppButton>
                </div>
              </Breakpoint>
            </div>
          )}
        </div>
        <Breakpoint medium up>
          <div id={`login`}>
            <Credentials
              fieldIncomplete={this.state.fieldIncomplete}
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
              fieldIncomplete={this.state.fieldIncomplete}
              error={this.state.error}
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
                fieldIncomplete={this.state.fieldIncomplete}
                error={this.state.error}
                handleSubmit={this.logInSubmit}
                handleChange={this.handleChange}
                close={this.showLogInMobile}
                buttonName={`Log In!`}
                id={`login`}
              />
            )}
            {this.state.showSignUpMobile && (
              <CredentialsMobile
                fieldIncomplete={this.state.fieldIncomplete}
                error={this.state.error}
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

export default withRouter(Header);
