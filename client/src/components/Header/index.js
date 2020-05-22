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
    };
  }

  handleChange = (event, stateKey) => {
    this.setState({ [stateKey]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.logIn({
      username: this.state.username,
      password: this.state.password,
    });
  };

  newUserSubmit = event => {
    event.preventDefault();
    this.signUpUser({
      username: this.state.username,
      password: this.state.password,
    });
  };

  signUpUser = signUpDetails => {
    API.newUser(signUpDetails)
      .then(() => this.signUp())
      .catch(err => console.error(err));
  };

  logIn = signInDetails => {
    API.logIn(signInDetails)
      .then(() => this.changeUser())
      .catch(err => console.error(err));
  };

  logOut = () => {
    API.logOut()
      .then(() => this.changeUser())
      .catch(err => console.error(err));
  };

  signUp = () => {
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

  render() {
    return (
      <div>
        <h1>Superhero Battle</h1>
        {!this.props.loggedIn ? (
          <div>
            {" "}
            {!this.state.signUpMode ? (
              <>
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
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        ) : (
          <div>
            <p>Currently signed in: {this.props.currentUser.username}</p>
            <button onClick={() => this.logOut()}>Log Out</button>
          </div>
        )}
      </div>
    );
  }
}

export default Header;
