import React, { Component } from "react";

import colors from "../../config/colors";

class Credentials extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div
        className={`${this.props.id}-form`}
        style={{ width: `100%`, backgroundColor: colors.primary }}
      >
        <form onSubmit={event => this.props.handleSubmit(event)}>
          <input
            id={`${this.props.id}-username`}
            onChange={event => this.props.handleChange(event, `username`)}
            placeholder="username"
          />
          <input
            id={`${this.props.id}-password`}
            type="password"
            onChange={event => this.props.handleChange(event, `password`)}
            placeholder="password"
          />
          <button type="submit">{this.props.buttonName}</button>
        </form>
      </div>
    );
  }
}

export default Credentials;
