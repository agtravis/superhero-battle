import React, { Component } from "react";
import colors from "../../config/colors";

class AppInput extends Component {
  handleKeyUp = event => {
    if (
      event.key === `Enter` &&
      (this.props.fieldName === `password` ||
        this.props.fieldName === `username`)
    ) {
      let type = this.props.id.split(`-`)[0];
      this.props.handleSubmit(event, type);
    }
    if (event.key === `Enter` && this.props.fieldName === `searchField`) {
      this.props.handleSubmit();
    }
  };

  styles = {
    errorContainer: {
      display: `flex`,
      justifyContent: `center`,
      position: `relative`,
      textAlign: `center`,
    },
    errorText: {
      backgroundColor: colors.lightDanger,
      border: `2px solid red`,
      borderRadius: `5px`,
      color: `red`,
      fontSize: `.6rem`,
      marginTop: `5px`,
      padding: `5px`,
      position: `absolute`,
    },
    input: {
      backgroundColor: this.props.backgroundColor
        ? this.props.backgroundColor
        : colors.lightPrimary,
      borderRadius: `50px`,
      color: colors.darkPrimary,
      fontSize: this.props.mode === `mobile` ? `.5rem` : `inherit`,
      outline: `none`,
      padding: `3px`,
      textAlign: `center`,
      ...this.props.style,
    },
  };

  render() {
    return (
      <div>
        <input
          autoCapitalize={this.props.autoCapitalize}
          autoCorrect={this.props.autoCorrect}
          autoComplete={`off`}
          id={`${this.props.id}`}
          onKeyUp={
            this.props.mode === `mobile` ||
            this.props.fieldName === `searchField`
              ? event => this.handleKeyUp(event)
              : null
          }
          onChange={event =>
            this.props.handleChange(event, this.props.fieldName)
          }
          placeholder={this.props.placeholder}
          style={{
            ...this.styles.input,
            border: `${this.props.mode === `mobile` ? 1 : 2}px solid ${
              this.props.error ? `red` : colors.darkSecondary
            }`,
          }}
          type={this.props.type}
        />
        <div
          style={{
            ...this.styles.errorContainer,
            height:
              this.props.error && this.props.mode === `mobile` ? `25px` : `0`,
          }}
        >
          {this.props.error && (
            <p style={this.styles.errorText}>{this.props.errorMessage}</p>
          )}
        </div>
      </div>
    );
  }
}

export default AppInput;
