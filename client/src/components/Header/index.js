import React, { Component } from "react";

import API from "../../utils/API";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ``,
      password: ``,
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

  changeUser = () => {
    this.props.changeUser();
  };

  render() {
    return (
      <div>
        <h1>Superhero Battle</h1>
        {!this.props.loggedIn ? (
          <form onSubmit={event => this.handleSubmit(event)}>
            <input onChange={event => this.handleChange(event, `username`)} />
            <input
              type="password"
              onChange={event => this.handleChange(event, `password`)}
            />
            <button type="submit">Log In</button>
          </form>
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
