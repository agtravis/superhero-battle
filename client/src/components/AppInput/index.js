import React, { Component } from "react";

import "./style.css";

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
            border: `2px solid ${colors.darkPrimary}`,
            borderRadius: `50px`,
            outline: `none`,
            color: colors.darkPrimary,
            padding: `5px`,
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
      </div>
    );
  }
}

export default AppInput;
