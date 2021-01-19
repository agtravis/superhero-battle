import React, { Component } from "react";
import colors from "../../config/colors";
import AppLink from "../AppLink";
import CredentialsFormMobile from "../CredentialsFormMobile";

class Credentials extends Component {
  componentDidMount() {
    document.getElementById(`${this.props.id}-username-mobile`).focus();
  }

  styles = {
    closeButton: {
      fontWeight: `bold`,
      fontSize: `1.5rem`,
      marginBottom: `-15px`,
      paddingRight: `7px`,
      textAlign: `right`,
    },
    container: {
      backgroundColor: colors.mediumPrimary,
      border: `solid 5px ${colors.primary}`,
      borderRadius: `15px`,
      boxShadow: `0px 0px 40px grey`,
      height: `345px`,
      left: window.innerWidth / 2 - 100,
      position: `absolute`,
      top: 25,
      width: `200px`,
    },
  };

  render() {
    return (
      <div style={this.styles.container}>
        <div style={this.styles.closeButton}>
          <AppLink onClick={this.props.close}>X</AppLink>
        </div>
        <form onSubmit={event => this.props.handleSubmit(event, this.props.id)}>
          {this.props.id === `login` && (
            <CredentialsFormMobile
              buttonName={this.props.buttonName}
              errorUser={
                this.props.error === `userdoesnotexist` ||
                this.props.fieldIncomplete === `nousername`
                  ? true
                  : false
              }
              errorMessageUser={
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
              handleSubmit={this.props.handleSubmit}
              id={this.props.id}
            />
          )}

          {this.props.id === `signup` && (
            <CredentialsFormMobile
              buttonName={this.props.buttonName}
              errorUser={
                this.props.error === `useralreadyexists` ||
                this.props.fieldIncomplete === `nousername`
                  ? true
                  : false
              }
              errorMessageUser={
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
                  ? `Password must be at least  8 characters, and contain at least one upper case letter, one lower case letter, one number, and one special character`
                  : `Please enter a password`
              }
              handleChange={this.props.handleChange}
              handleSubmit={this.props.handleSubmit}
              id={this.props.id}
            />
          )}
        </form>
      </div>
    );
  }
}

export default Credentials;
