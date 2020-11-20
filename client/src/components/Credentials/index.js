import React, { Component } from "react";

import colors from "../../config/colors";

class Credentials extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <form
        onSubmit={event => this.props.handleSubmit(event)}
        style={{
          backgroundColor: colors.primary,
          position: `relative`,
          // top: -20,
          // top: this.props.buttonName === `Sign Up!` ? -20 : 0,
          top: this.props.buttonName !== `Sign Up!` ? 20 : 0,
        }}
      >
        <input
          id="username"
          onChange={event => this.props.handleChange(event, `username`)}
          placeholder="username"
        />
        <input
          id="password"
          type="password"
          onChange={event => this.props.handleChange(event, `password`)}
          placeholder="password"
        />
        <button type="submit">{this.props.buttonName}</button>
      </form>
    );
  }
}

export default Credentials;
