import React, { Component } from "react";

import AppButton from "../AppButton";
import AppLink from "../AppLink";
import AppInput from "../AppInput";

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
          paddingBottom: `8px`,
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
              <AppInput
                error={
                  this.props.error === `userdoesnotexist` ||
                  this.props.fieldIncomplete === `nousername`
                    ? true
                    : false
                }
                errorMessage={
                  this.props.error
                    ? `User does not exist`
                    : `Please enter a username`
                }
                fieldName={`username`}
                id={`${this.props.id}-username`}
                handleChange={this.props.handleChange}
                placeholder="username"
              />
              <AppInput
                error={
                  this.props.error === `passworddoesnotmatch` ||
                  this.props.fieldIncomplete === `nopassword`
                    ? true
                    : false
                }
                errorMessage={
                  this.props.error
                    ? `Password does not match`
                    : `Please enter a password`
                }
                fieldName={`password`}
                id={`${this.props.id}-password`}
                type="password"
                handleChange={this.props.handleChange}
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
