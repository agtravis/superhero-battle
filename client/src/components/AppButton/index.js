import React, { Component } from "react";
import "./style.css";

class AppButton extends Component {
  render() {
    return (
      <div>
        <button
          style={{ width: this.props.width, margin: this.props.margin }}
          className={`appButton`}
          onClick={this.props.onClick}
        >
          {this.props.children}
        </button>
      </div>
    );
  }
}

export default AppButton;
