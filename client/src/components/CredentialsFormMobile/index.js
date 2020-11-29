import React, { Component } from "react";
import AppInput from "../AppInput";
import AppLink from "../AppLink";

class CredentialsFormMobile extends Component {
  styles = {
    innerContainer: {
      alignItems: `center`,
      display: `flex`,
      flexDirection: `column`,
      height: `100px`,
      justifyContent: `space-around`,
    },
  };

  render() {
    return (
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
            style={{ width: `100px` }}
          />
        </div>
        <div>
          <AppInput
            error={this.props.errorPassword}
            errorMessage={this.props.errorMessagePassword}
            fieldName={`password`}
            style={{ width: `100px` }}
            handleChange={this.props.handleChange}
            handleSubmit={this.props.handleSubmit}
            id={`${this.props.id}-password-mobile`}
            mode={`mobile`}
            placeholder={`password`}
            type={`password`}
          />
        </div>
        <div style={{ marginTop: `10px` }}>
          <AppLink
            onClick={event => this.props.handleSubmit(event)}
            style={{ width: `100px` }}
            type={`submit`}
          >
            {this.props.buttonName}
          </AppLink>
        </div>
      </div>
    );
  }
}

export default CredentialsFormMobile;
