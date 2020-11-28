import React, { Component } from "react";

import colors from "../../config/colors";
import AppLink from "../AppLink";
import AppInput from "../AppInput";

class Credentials extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    document.getElementById(`${this.props.id}-username-mobile`).focus();
  }

  render() {
    return (
      <div
        style={{
          width: `200px`,
          height: `auto`,
          border: `solid 5px ${colors.primary}`,
          borderRadius: `15px`,
          position: `absolute`,
          top: 25,
          left: window.innerWidth / 2 - 100,
          boxShadow: `0px 0px 40px grey`,
          backgroundColor: colors.mediumPrimary,
        }}
      >
        <div
          style={{
            textAlign: `right`,
            fontWeight: `bold`,
            fontSize: `1.5rem`,
            paddingRight: `7px`,
            marginBottom: `-15px`,
          }}
        >
          <AppLink onClick={this.props.close}>X</AppLink>
        </div>
        <form onSubmit={event => this.props.handleSubmit(event)}>
          {this.props.id === `login` && (
            <div
              style={{
                display: `flex`,
                flexDirection: `column`,
                alignItems: `center`,
                height: `100px`,
                justifyContent: `space-around`,
              }}
            >
              <div>
                <AppInput
                  mode={`mobile`}
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
                  style={{ width: `100px` }}
                  id={`${this.props.id}-username-mobile`}
                  handleChange={this.props.handleChange}
                  handleSubmit={this.props.handleSubmit}
                  placeholder={`username`}
                  autoCapitalize={`none`}
                  autoCorrect={`off`}
                />
              </div>
              <div>
                <AppInput
                  mode={`mobile`}
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
                  style={{ width: `100px` }}
                  id={`${this.props.id}-password-mobile`}
                  type={`password`}
                  handleChange={this.props.handleChange}
                  placeholder={`password`}
                  handleSubmit={this.props.handleSubmit}
                />
              </div>
              <div style={{ marginTop: `10px` }}>
                <AppLink
                  style={{ width: `100px` }}
                  type="submit"
                  onClick={event => this.props.handleSubmit(event)}
                >
                  {this.props.buttonName}
                </AppLink>
              </div>
            </div>
          )}
          {this.props.id === `signup` && (
            <div
              style={{
                display: `flex`,
                flexDirection: `column`,
                alignItems: `center`,
                height: `100px`,
                justifyContent: `space-around`,
              }}
            >
              <div>
                <AppInput
                  mode={`mobile`}
                  error={
                    this.props.error === `useralreadyexists` ||
                    this.props.fieldIncomplete === `nousername`
                      ? true
                      : false
                  }
                  errorMessage={
                    this.props.error
                      ? `User already exists`
                      : `Please enter a username`
                  }
                  fieldName={`username`}
                  style={{ width: `100px` }}
                  id={`${this.props.id}-username-mobile`}
                  handleChange={this.props.handleChange}
                  placeholder={`username`}
                  autoCapitalize={`none`}
                  autoCorrect={`off`}
                />
              </div>
              <div>
                <AppInput
                  mode={`mobile`}
                  error={
                    this.props.error === `regexfail` ||
                    this.props.fieldIncomplete === `nopassword`
                      ? true
                      : false
                  }
                  errorMessage={
                    this.props.error
                      ? `Password must be at least 4 characters`
                      : `Please enter a password`
                  }
                  fieldName={`password`}
                  style={{ width: `100px` }}
                  id={`${this.props.id}-password-mobile`}
                  type={`password`}
                  handleChange={this.props.handleChange}
                  placeholder={`password`}
                  handleSubmit={this.props.handleSubmit}
                />
              </div>
              <div style={{ marginTop: `10px` }}>
                <AppLink
                  style={{ width: `100px` }}
                  type="submit"
                  onClick={event => this.props.handleSubmit(event)}
                >
                  {this.props.buttonName}
                </AppLink>
              </div>
            </div>
          )}
        </form>
      </div>
    );
  }
}

export default Credentials;
