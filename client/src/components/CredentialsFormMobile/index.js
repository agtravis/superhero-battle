import React, { Component } from "react";
import AppInput from "../AppInput";
import AppLink from "../AppLink";

class CredentialsFormMobile extends Component {
  styles = {
    container: {
      alignItems: `center`,
      display: `flex`,
      flexDirection: `column`,
      height: `285px`,
      justifyContent: `space-between`,
    },
    innerContainer: {
      display: `flex`,
      flexDirection: `column`,
      justifyContent: `space-between`,
    },
  };

  render() {
    return (
      <div style={this.styles.container}>
        <div style={this.styles.innerContainer}>
          <div>
            <AppInput
              autoCapitalize={`none`}
              autoCorrect={`off`}
              error={this.props.errorUser}
              errorMessage={this.props.errorMessageUser}
              fieldName={`username`}
              handleChange={this.props.handleChange}
              handleSubmit={this.props.handleSubmit}
              id={`${this.props.id}-username-mobile`}
              mode={`mobile`}
              placeholder={`username`}
            />
          </div>
          <div>
            <AppInput
              error={this.props.errorPassword}
              errorMessage={this.props.errorMessagePassword}
              fieldName={`password`}
              handleChange={this.props.handleChange}
              handleSubmit={this.props.handleSubmit}
              id={`${this.props.id}-password-mobile`}
              mode={`mobile`}
              placeholder={`password`}
              type={`password`}
            />
          </div>
        </div>
        <AppLink
          onClick={event => this.props.handleSubmit(event, this.props.id)}
          type={`submit`}
        >
          {this.props.buttonName}
        </AppLink>
      </div>
    );
  }
}

export default CredentialsFormMobile;
