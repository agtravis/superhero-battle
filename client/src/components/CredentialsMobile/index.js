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
          height: `210px`,
          border: `solid 5px ${colors.primary}`,
          borderRadius: `15px`,
          position: `absolute`,
          top: 25,
          left: window.innerWidth / 2 - 100,
          boxShadow: `0px 0px 40px grey`,
          backgroundColor: colors.white,
        }}
      >
        <div
          style={{
            textAlign: `right`,
            fontWeight: `bold`,
            fontSize: `1.5rem`,
            paddingRight: `7px`,
          }}
        >
          <AppLink onClick={this.props.close}>X</AppLink>
        </div>
        <form onSubmit={event => this.props.handleSubmit(event)}>
          <div
            style={{
              display: `flex`,
              flexDirection: `column`,
              alignItems: `center`,
              height: `200px`,
              justifyContent: `space-around`,
            }}
          >
            <div>
              <AppInput
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
                fieldName={`password`}
                style={{ width: `100px` }}
                id={`${this.props.id}-password-mobile`}
                type={`password`}
                handleChange={this.props.handleChange}
                placeholder={`password`}
              />
            </div>
            <div>
              <button style={{ width: `100px` }} type="submit">
                {this.props.buttonName}
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Credentials;
