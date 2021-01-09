import React, { Component } from "react";
import API from "../utils/API";
import AppButton from "../components/AppButton";
import ErrorMessagePasswordChange from "../components/SettingsFlow/ErrorMessagePasswordChange";
import PasswordInputs from "../components/SettingsFlow/PasswordInputs";
import PageTitle from "../components/PageTitle";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null,
      error: false,
      new: ``,
      newAgain: ``,
      old: ``,
      passwordChanged: false,
      showNewInput: false,
      showOldInput: false,
      showStartButton: true,
    };
  }

  styles = {
    container: {
      alignItems: `center`,
      display: `flex`,
      flexDirection: `column`,
      textAlign: `center`,
    },
    formsContainer: {
      alignItems: `center`,
      display: `flex`,
      flexDirection: `column`,
      minHeight: `330px`,
      width: `70%`,
    },
    formsSubContainer: { marginTop: `50px`, width: `100%` },
    completeText: { color: `green` },
  };

  cancel = event => {
    event.preventDefault();
    this.setState({
      error: false,
      errorMessage: null,
      new: ``,
      newAgain: ``,
      old: ``,
      passwordChanged: false,
      showNewInput: false,
      showOldInput: false,
      showStartButton: true,
    });
  };

  handleChange = (event, field) =>
    this.setState({ [field]: event.target.value });

  setError = message => {
    if (message) {
      this.setState({ error: true, errorMessage: message });
      document.getElementById(`change-password-field`).focus();
    } else {
      this.setState({ error: false, errorMessage: null });
    }
  };

  toggle = states => {
    for (const state of states) {
      this.setState({ [state]: !this.state[state] });
    }
  };

  verifyNewPassword = event => {
    event.preventDefault();
    this.setError();
    if (this.state.new.length < 4) {
      this.setError(`Password must be at least 4 characters in length!`);
    } else {
      if (this.state.new !== this.state.newAgain) {
        this.setError(`the second password does not match the first`);
      } else if (this.state.new === this.state.newAgain) {
        this.setError();
        API.changePassword({
          id: this.props.currentUser._id,
          newPassword: this.state.new,
        })
          .then(() => {
            this.toggle([`showNewInput`, `showStartButton`, `passwordChanged`]);
          })
          .catch(err => console.error(err));
      }
    }
  };

  verifyOldPassword = event => {
    event.preventDefault();
    if (this.state.old.length < 1) {
      this.setError(`Please enter a password`);
    } else {
      this.setError();
      API.checkPassword({
        userId: this.props.currentUser._id,
        old: this.state.old,
      })
        .then(response => {
          if (response.data === false) {
            this.setError(`Password is incorrect`);
          } else if (response.data === true) {
            this.toggle([`showOldInput`, `showNewInput`]);
          } else {
            console.log(response);
          }
        })
        .catch(err => console.error(err));
    }
  };

  render() {
    if (!this.props.currentUser) {
      window.location.href = `/`;
    }
    return (
      <div style={this.styles.container}>
        <PageTitle>Settings</PageTitle>
        <div style={this.styles.formsContainer}>
          <div style={this.styles.formsSubContainer}>
            {this.state.showStartButton && !this.state.passwordChanged && (
              <div>
                <AppButton
                  onClick={() =>
                    this.toggle([`showOldInput`, `showStartButton`])
                  }
                >
                  Change Password
                </AppButton>
              </div>
            )}
            {this.state.showOldInput && (
              <PasswordInputs
                buttonName={`Continue`}
                handleChange={this.handleChange}
                inputs={[{ value: this.state.old, fieldName: `old` }]}
                onSubmit={this.verifyOldPassword}
                title={`Enter your old password:`}
              />
            )}
            {this.state.showNewInput && (
              <PasswordInputs
                buttonName={`Change Password`}
                cancel={this.cancel}
                handleChange={this.handleChange}
                inputs={[
                  { value: this.state.new, fieldName: `new` },
                  { value: this.state.newAgain, fieldName: `newAgain` },
                ]}
                onSubmit={this.verifyNewPassword}
                subtitle={`Re-enter your new password:`}
                title={`Enter your new password:`}
              />
            )}
            {this.state.error && (
              <ErrorMessagePasswordChange
                errorMessage={this.state.errorMessage}
              />
            )}
            {this.state.passwordChanged && (
              <div>
                <p style={this.styles.completeText}>Password Changed</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
