import React, { Component } from "react";
import colors from "../../config/colors";
import AppButton from "../AppButton";
import AppLink from "../AppLink";
import AppInput from "../AppInput";

class Credentials extends Component {
  styles = {
    buttonSpacerDiv: { width: `10px` },
    credentialsButtonsContainer: {
      display: `flex`,
      flexDirection: `row`,
      paddingTop: `2px`,
    },
    credentialsContainer: {
      backgroundColor: colors.primary,
      display: `flex`,
      justifyContent: `center`,
      paddingBottom: `15px`,
      width: `100%`,
    },
    credentialsHider: { paddingTop: `3px` },
    formInnerContainer: {
      display: `flex`,
      flexDirection: `row`,
      justifyContent: `space-around`,
    },
    formOuterContainer: { width: `60%` },
    input: { margin: `0px 5px` },
  };

  hiderButtonText = `Hide`;

  render() {
    return (
      <div
        className={`${this.props.id}-form`}
        style={this.styles.credentialsContainer}
      >
        <div style={this.styles.formOuterContainer}>
          <form onSubmit={event => this.props.handleSubmit(event)}>
            {this.props.id === `login` && (
              <div style={this.styles.formInnerContainer}>
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
                  handleChange={this.props.handleChange}
                  id={`${this.props.id}-username`}
                  placeholder="username"
                  style={this.styles.input}
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
                  handleChange={this.props.handleChange}
                  id={`${this.props.id}-password`}
                  placeholder={`password`}
                  style={this.styles.input}
                  type={`password`}
                />
                <div style={this.styles.credentialsButtonsContainer}>
                  <AppButton width={80} type={`submit`}>
                    {this.props.buttonName}
                  </AppButton>
                  <div style={this.styles.buttonSpacerDiv}></div>
                  <div style={this.styles.credentialsHider}>
                    <AppLink onClick={this.props.close}>
                      {this.hiderButtonText}
                    </AppLink>
                  </div>
                </div>
              </div>
            )}
            {this.props.id === `signup` && (
              <div style={this.styles.formInnerContainer}>
                <AppInput
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
                  handleChange={this.props.handleChange}
                  id={`${this.props.id}-username`}
                  placeholder="username"
                />
                <AppInput
                  error={
                    this.props.error === `regexfail` ||
                    this.props.fieldIncomplete === `nopassword`
                      ? true
                      : false
                  }
                  errorMessage={
                    this.props.error
                      ? `Password must be at least 4 characters` // 8 characters, and contain at least one upper case letter, one lower case letter, one number, and one special character`
                      : `Please enter a password`
                  }
                  fieldName={`password`}
                  handleChange={this.props.handleChange}
                  id={`${this.props.id}-password`}
                  placeholder={`password`}
                  type={`password`}
                />
                <div style={this.styles.credentialsButtonsContainer}>
                  <AppButton width={80} type={`submit`}>
                    {this.props.buttonName}
                  </AppButton>
                  <div style={this.styles.buttonSpacerDiv}></div>
                  <div style={this.styles.credentialsHider}>
                    <AppLink onClick={this.props.close}>
                      {this.hiderButtonText}
                    </AppLink>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    );
  }
}

export default Credentials;
