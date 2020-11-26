import React, { Component } from "react";

import colors from "../../config/colors";

class AppInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <input
          style={{
            backgroundColor: colors.lightPrimary,
            border:
              this.props.mode === `mobile`
                ? `1px solid ${this.props.error ? `red` : colors.darkPrimary}`
                : `2px solid ${this.props.error ? `red` : colors.darkPrimary}`,
            borderRadius: `50px`,
            outline: `none`,
            color: colors.darkPrimary,
            fontSize: this.props.mode === `mobile` ? `.5rem` : `inherit`,
            padding: `3px`,
            textAlign: `center`,
            ...this.props.style,
          }}
          id={`${this.props.id}`}
          onChange={event =>
            this.props.handleChange(event, this.props.fieldName)
          }
          type={this.props.type}
          placeholder={this.props.placeholder}
          autoCapitalize={this.props.autoCapitalize}
          autoCorrect={this.props.autoCorrect}
        />
        <div
          style={{
            position: `relative`,
            display: `flex`,
            justifyContent: `center`,
            textAlign: `center`,
          }}
        >
          {this.props.error && (
            <p
              style={{
                position: `absolute`,
                fontSize: `.6rem`,
                color: `red`,
              }}
            >
              {this.props.errorMessage}
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default AppInput;
