import React, { Component } from "react";

import Credentials from "../Credentials";
import ToggleSignIn from "../ToggleSignIn";

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

  handleSubmit = event => {
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
        this.signUp();
        this.logIn(signUpDetails);
      })
      .catch(err => console.error(err));
  };

  logIn = signInDetails => {
    API.logIn(signInDetails)
      .then(() => {
        this.setState({ modalType: `` });
        this.changeUser();
      })
      .catch(err => console.error(err));
  };

  logOut = () => {
    API.logOut()
      .then(() => this.changeUser())
      .catch(err => console.error(err));
  };

  signUp = () => {
    this.resetCredentials();
    !this.state.signUpMode
      ? this.setState({
          signUpMode: true,
        })
      : this.setState({
          signUpMode: false,
        });
  };

  changeUser = () => {
    this.props.changeUser();
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

  render() {
    return (
      <div>
        <div>
          <a
            href="/"
            style={{
              textDecoration: `none`,
              color: `black`,
            }}
          >
            <h1>Superhero Battle</h1>
          </a>
        </div>
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
                handleSubmit={this.handleSubmit}
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

        {/* log in sign up old code */}
        {/*{!this.props.loggedIn ? (
          <div>
            {" "}
            {!this.state.signUpMode ? (
              <div>
                <Credentials
                  handleSubmit={this.handleSubmit}
                  handleChange={this.handleChange}
                  buttonName={`Log In!`}
                />
                <ToggleSignIn
                  signUp={this.signUp}
                  buttonName={`Sign Up`}
                  text={` for an account!`}
                />
              </div>
            ) : (
              <div>
                <Credentials
                  handleSubmit={this.newUserSubmit}
                  handleChange={this.handleChange}
                  buttonName={`Sign Up!`}
                />
                <ToggleSignIn
                  signUp={this.signUp}
                  buttonName={`Log In`}
                  text={` to your account!`}
                />
              </div>
            )}
          </div>
        ) : (
          <div>
            <p>
              Currently signed in: <em>{this.props.currentUser.username}</em>
            </p>
            <button onClick={() => this.logOut()}>Log Out</button>
          </div>
        )}*/}
      </div>
    );
  }
}

export default Header;
