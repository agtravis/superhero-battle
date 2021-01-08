import React, { Component } from "react";
import colors from "../../../config/colors";

class ErrorMessagePasswordChange extends Component {
  styles = {
    text: { color: colors.danger },
  };

  render() {
    return (
      <div>
        <p style={this.styles.text}>{this.props.errorMessage}</p>
      </div>
    );
  }
}

export default ErrorMessagePasswordChange;
