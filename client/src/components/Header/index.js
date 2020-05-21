import React, { Component } from "react";

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
                <form onSubmit={event => this.handleSubmit(event)}>
                  <input
                    onChange={event => this.handleChange(event, `username`)}
                  />
                  <input
                    type="password"
                    onChange={event => this.handleChange(event, `password`)}
                  />
                  <button type="submit">Log In</button>
                </form>
                <br />
              </>
            ) : null}
            {!this.state.signUpMode ? (
              <p>
                Or <button onClick={() => this.signUp()}>Sign Up</button> for an
                account!
              </p>
            ) : (
              <>
                <form onSubmit={event => this.newUserSubmit(event)}>
                  <input
                    onChange={event => this.handleChange(event, `username`)}
                  />
                  <input
                    type="password"
                    onChange={event => this.handleChange(event, `password`)}
                  />
                  <button type="submit">Sign Up!</button>
                </form>
                <br />
                <p>
                  Or <button onClick={() => this.signUp()}>Log In</button> to
                  your account!
                </p>
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
