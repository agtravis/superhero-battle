import React, { Component } from "react";
import AppButton from "../components/AppButton";
import PageTitle from "../components/PageTitle";
import API from "../utils/API";
import bcrypt from "bcryptjs";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      old: ``,
      new: ``,
    };
  }

  componentDidMount() {
    API.getUserDetails(this.props.currentUser._id)
      .then(response => {
        console.log(response.data);
      })
      .catch(err => console.error(err));
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.new.length < 1) {
      console.log(`new password not long enough`);
    } else {
      API.getUserDetails(this.props.currentUser._id)
        .then(response => {
          bcrypt.compare(this.state.old, response.data.password, (err, res) => {
            if (err) {
              console.error(err);
            } else if (res) {
              API.changePassword({
                id: this.props.currentUser._id,
                newPassword: this.state.new,
              })
                .then(response => console.log(response.data))
                .catch(err => console.error(err));
            } else {
              console.log(`password does not match`);
            }
          });
        })
        .catch(err => console.error(err));
    }
  };

  handleChange = (value, type) => this.setState({ [type]: value });

  render() {
    if (!this.props.currentUser) {
      window.location.href = `/`;
    }
    return (
      <div>
        <PageTitle>Settings</PageTitle>
        <form onSubmit={event => this.handleSubmit(event)}>
          <input
            value={this.state.old}
            onChange={event => this.handleChange(event.target.value, `old`)}
          />
          <input
            value={this.state.new}
            onChange={event => this.handleChange(event.target.value, `new`)}
          />
          <AppButton type={`submit`}>CLICK</AppButton>
        </form>
      </div>
    );
  }
}

export default Settings;
