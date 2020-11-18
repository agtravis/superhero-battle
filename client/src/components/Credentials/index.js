import React, { Component } from "react";

class Credentials extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <form
        onSubmit={event => this.props.handleSubmit(event)}
        style={{ borderTop: `solid black 1px` }}
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
