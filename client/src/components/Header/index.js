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
      error: ``,
      fieldIncomplete: ``,
      password: ``,
      showLogIn: false,
      showSignUp: false,
      showLogInMobile: false,
      showSignUpMobile: false,
      showNav: false,
      username: ``,
    };
  }

  title = `Superhero Battle`;

  styles = {
    header: {
      alignItems: `center`,
      backgroundColor: colors.primary,
      display: `flex`,
      justifyContent: `space-between`,
      padding: `10px 20px`,
      position: `relative`,
      zIndex: 1,
    },
    headerTitleText: {
      color: colors.black,
      fontFamily: `Impact, Charcoal, sans-serif`,
    },
  };

  addAndRemoveOneClass = (element, classToAdd, ClassToRemove) => {
    element.classList.add(classToAdd);
    element.classList.remove(ClassToRemove);
  };

  assignElementById = id =>
    document.getElementById(id)
      ? document.getElementById(id)
      : document.getElementById(`${id}-mobile`)
      ? document.getElementById(`${id}-mobile`)
      : null;

  logIn = signInDetails => {
    this.setState({ error: ``, fieldIncomplete: `` });
    if (signInDetails.username.length === 0) {
      this.setState({ fieldIncomplete: `nousername` });
      this.assignElementById(`login-username`).focus();
    } else if (signInDetails.password.length === 0) {
      this.setState({ fieldIncomplete: `nopassword` });
      const password = this.assignElementById(`login-password`);
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
                  this.props.changeUser();
                }
              })
              .catch(() => {
                this.setState({ error: `passworddoesnotmatch` });
                const password = this.assignElementById(`login-password`);
                password.value = ``;
                password.focus();
              });
          } else {
            this.setState({ error: `userdoesnotexist` });
            this.assignElementById(`login-username`).focus();
          }
        })
        .catch(err => console.error(err));
    }
  };

  logInSignUpSubmit = (event, type) => {
    event.preventDefault();
    const userDetails = {
      username: this.state.username,
      password: this.state.password,
    };
    type === `login` ? this.logIn(userDetails) : this.signUpUser(userDetails);
  };

  logOut = () => {
    API.logOut()
      .then(() => this.props.changeUser())
      .catch(err => console.error(err));
  };

  handleChange = (event, stateKey) => {
    this.setState({ [stateKey]: event.target.value });
  };

  resetCredentials = mode => {
    this.assignElementById(`${mode}-username`).value = ``;
    this.assignElementById(`${mode}-password`).value = ``;
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
      setTimeout(() => this.showLogInSignUpLogic(`login`), 400);
    } else {
      this.showLogInSignUpLogic(`login`);
    }
    setTimeout(() => {
      this.assignElementById(`login-username`).focus();
    }, 500);
  };

  showLogInMobile = () => {
    if (this.state.showSignUpMobile) {
      this.setState({ showSignUpMobile: false });
    }
    this.setState({ showLogInMobile: !this.state.showLogInMobile });
  };

  showLogInSignUpLogic = type => {
    this.translateForm(document.getElementsByClassName(`${type}-form`)[0]);
    type === `login`
      ? this.setState({ showLogIn: !this.state.showLogIn })
      : this.setState({ showSignUp: !this.state.showSignUp });
  };

  showNav = () => {
    if (document.getElementsByClassName(`nav-mobile`)[0]) {
      const navMobile = document.getElementsByClassName(`nav-mobile`)[0];
      navMobile.classList.contains(`translateNavMobile`)
        ? this.addAndRemoveOneClass(
            navMobile,
            `translateNavMobileBack`,
            `translateNavMobile`
          )
        : this.addAndRemoveOneClass(
            navMobile,
            `translateNavMobile`,
            `translateNavMobileBack`
          );
    }
  };

  showSignUp = () => {
    this.resetCredentials(`login`);
    if (this.state.showLogIn) {
      this.showLogIn();
      setTimeout(() => this.showLogInSignUpLogic(`signup`), 400);
    } else {
      this.showLogInSignUpLogic(`signup`);
    }
    setTimeout(() => {
      this.assignElementById(`signup-username`).focus();
    }, 500);
  };

  showSignUpMobile = () => {
    if (this.state.showLogInMobile) {
      this.setState({ showLogInMobile: false });
    }
    this.setState({ showSignUpMobile: !this.state.showSignUpMobile });
  };

  signUpUser = signUpDetails => {
    this.setState({ error: ``, fieldIncomplete: `` });
    if (signUpDetails.username.length === 0) {
      this.setState({ fieldIncomplete: `nousername` });
      this.assignElementById(`signup-username`).focus();
    } else if (signUpDetails.password.length < 4) {
      this.setState({ error: `regexfail` });
      const password = this.assignElementById(`signup-password`);
      password.value = ``;
      password.focus();
    } else {
      API.findOneUserByName({ search: signUpDetails.username }).then(data => {
        if (
          data.data.length > 0 &&
          signUpDetails.username === data.data[0].username
        ) {
          this.setState({ error: `useralreadyexists` });
          this.assignElementById(`signup-password`).value = ``;
          this.setState({ password: `` });
          this.assignElementById(`signup-username`).focus();
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

  translateForm = form => {
    const body = document.getElementsByClassName(`main-body`)[0];
    if (form.classList.contains(`translate`)) {
      this.addAndRemoveOneClass(form, `translateBack`, `translate`);
      this.addAndRemoveOneClass(body, `translateBodyBack`, `translateBody`);
    } else {
      this.addAndRemoveOneClass(form, `translate`, `translateBack`);
      this.addAndRemoveOneClass(body, `translateBody`, `translateBodyBack`);
    }
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
              handleSubmit={this.logInSignUpSubmit}
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
              handleSubmit={this.logInSignUpSubmit}
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
                handleSubmit={this.logInSignUpSubmit}
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
                handleSubmit={this.logInSignUpSubmit}
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

// Code to switch password validation from 4 character minimum to 8, one lower, one upper, one number, one special
// } else if (
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/.test(
//     signUpDetails.password
//   ) === false
// ) {
