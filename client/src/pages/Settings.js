import React, { Component } from "react";
import AppButton from "../components/AppButton";
import AppInput from "../components/AppInput";
import PageTitle from "../components/PageTitle";
import API from "../utils/API";
import bcrypt from "bcryptjs";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      new: ``,
      newAgain: ``,
      old: ``,
      showOldInput: false,
      showNewInput: false,
      showStartButton: true,
      passwordChanged: false,
      error: false,
      errorMessage: null,
    };
  }

  setError = message => {
    if (message) {
      this.setState({ error: true, errorMessage: message });
    } else {
      this.setState({ error: false, errorMessage: null });
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
      API.getUserDetails(this.props.currentUser._id).then(response => {
        bcrypt.compare(this.state.old, response.data.password, (err, res) => {
          if (err) {
            console.error(err);
          } else if (res === false) {
            this.setError(`Password is incorrect`);
          } else if (res === true) {
            this.toggle([`showOldInput`, `showNewInput`]);
          }
        });
      });
    }
  };

  handleChange = (event, field) =>
    this.setState({ [field]: event.target.value });

  toggle = states => {
    for (const state of states) {
      this.setState({ [state]: !this.state[state] });
    }
  };

  render() {
    if (!this.props.currentUser) {
      window.location.href = `/`;
    }
    return (
      <div>
        <PageTitle>Settings</PageTitle>
        {this.state.showStartButton && (
          <div>
            <AppButton
              onClick={() => this.toggle([`showOldInput`, `showStartButton`])}
            >
              Change Password
            </AppButton>
          </div>
        )}
        {this.state.showOldInput && (
          <div>
            <form onSubmit={event => this.verifyOldPassword(event)}>
              <p>Enter your old password</p>
              <AppInput
                value={this.state.old}
                handleChange={this.handleChange}
                fieldName={`old`}
              />
              <AppButton type={`submit`}>Continue</AppButton>
            </form>
          </div>
        )}
        {this.state.showNewInput && (
          <div>
            <form onSubmit={event => this.verifyNewPassword(event)}>
              <p>Enter your new password</p>
              <AppInput
                value={this.state.new}
                handleChange={this.handleChange}
                fieldName={`new`}
              />
              <p>Enter your new password again</p>
              <AppInput
                value={this.state.newAgain}
                handleChange={this.handleChange}
                fieldName={`newAgain`}
              />
              <AppButton type={`submit`}>Change Password</AppButton>
            </form>
          </div>
        )}
        {this.state.error && (
          <div>
            <p>{this.state.errorMessage}</p>
          </div>
        )}
        {this.state.passwordChanged && (
          <div>
            <p>Password Changed</p>
          </div>
        )}
      </div>
    );
  }
}

export default Settings;
