import React, { Component } from "react";
import AppButton from "../AppButton";
import AppLink from "../AppLink";
import AppInput from "../AppInput";

class CredentialsForm extends Component {
  styles = {
    buttonSpacerDiv: { width: `10px` },
    credentialsButtonsContainer: {
      display: `flex`,
      flexDirection: `row`,
      paddingTop: `2px`,
    },
    credentialsHider: { paddingTop: `3px` },
    formInnerContainer: {
      display: `flex`,
      flexDirection: `row`,
      justifyContent: `space-around`,
    },
    input: { margin: `0px 5px` },
  };

  render() {
    return (
      <div style={this.styles.formInnerContainer}>
        <AppInput
          error={this.props.errorUsername}
          errorMessage={this.props.errorMessageUsername}
          fieldName={`username`}
          handleChange={this.props.handleChange}
          id={`${this.props.id}-username`}
          placeholder={`username`}
          style={this.styles.input}
        />
        <AppInput
          error={this.props.errorPassword}
          errorMessage={this.props.errorMessagePassword}
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
            <AppLink onClick={this.props.close}>Hide</AppLink>
          </div>
        </div>
      </div>
    );
  }
}

export default CredentialsForm;
