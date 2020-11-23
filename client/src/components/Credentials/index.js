import React, { Component } from "react";

import AppButton from "../AppButton";
import AppLink from "../AppLink";

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
        style={{
          width: `100%`,
          backgroundColor: colors.primary,
          display: `flex`,
          justifyContent: `center`,
          paddingBottom: `5px`,
        }}
      >
        <div style={{ width: `60%` }}>
          <form onSubmit={event => this.props.handleSubmit(event)}>
            <div
              style={{
                display: `flex`,
                flexDirection: `row`,
                justifyContent: `space-around`,
              }}
            >
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
              <div
                style={{
                  display: `flex`,
                  flexDirection: `row`,
                  paddingTop: `5px`,
                }}
              >
                <AppButton width={80} type="submit">
                  {this.props.buttonName}
                </AppButton>
                <div style={{ width: `10px` }}></div>
                <div style={{ paddingTop: `3px` }}>
                  <AppLink onClick={this.props.close}>hide</AppLink>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Credentials;
