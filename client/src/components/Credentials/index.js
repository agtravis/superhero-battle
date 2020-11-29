import React, { Component } from "react";
import colors from "../../config/colors";
import CredentialsForm from "../CredentialsForm";

class Credentials extends Component {
  styles = {
    credentialsContainer: {
      backgroundColor: colors.primary,
      display: `flex`,
      justifyContent: `center`,
      paddingBottom: `15px`,
      width: `100%`,
    },
    formOuterContainer: { width: `60%` },
  };

  render() {
    return (
      <div
        className={`${this.props.id}-form`}
        style={this.styles.credentialsContainer}
      >
        <div style={this.styles.formOuterContainer}>
          <form onSubmit={event => this.props.handleSubmit(event)}>
            {this.props.id === `login` && (
              <CredentialsForm
                buttonName={this.props.buttonName}
                close={this.props.close}
                errorUsername={
                  this.props.error === `userdoesnotexist` ||
                  this.props.fieldIncomplete === `nousername`
                    ? true
                    : false
                }
                errorMessageUsername={
                  this.props.error
                    ? `User does not exist`
                    : `Please enter a username`
                }
                errorPassword={
                  this.props.error === `passworddoesnotmatch` ||
                  this.props.fieldIncomplete === `nopassword`
                    ? true
                    : false
                }
                errorMessagePassword={
                  this.props.error
                    ? `Password does not match`
                    : `Please enter a password`
                }
                handleChange={this.props.handleChange}
                id={this.props.id}
              />
            )}
            {this.props.id === `signup` && (
              <CredentialsForm
                buttonName={this.props.buttonName}
                close={this.props.close}
                errorUsername={
                  this.props.error === `useralreadyexists` ||
                  this.props.fieldIncomplete === `nousername`
                    ? true
                    : false
                }
                errorMessageUsername={
                  this.props.error
                    ? `User already exists`
                    : `Please enter a username`
                }
                errorPassword={
                  this.props.error === `regexfail` ||
                  this.props.fieldIncomplete === `nopassword`
                    ? true
                    : false
                }
                errorMessagePassword={
                  this.props.error
                    ? `Password must be at least 4 characters` // 8 characters, and contain at least one upper case letter, one lower case letter, one number, and one special character`
                    : `Please enter a password`
                }
                handleChange={this.props.handleChange}
                id={this.props.id}
              />
            )}
          </form>
        </div>
      </div>
    );
  }
}

export default Credentials;
