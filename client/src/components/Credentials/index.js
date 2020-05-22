import React, { Component } from "react";

class Credentials extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <form onSubmit={event => this.props.handleSubmit(event)}>
        <input
          onChange={event => this.props.handleChange(event, `username`)}
          placeholder="username"
        />
        <input
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
