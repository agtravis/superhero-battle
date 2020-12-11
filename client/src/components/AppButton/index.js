import React, { Component } from "react";
import "./style.css";

class AppButton extends Component {
  render() {
    return (
      <div>
        <button
          value={this.props.value ? this.props.value : undefined}
          style={{ width: this.props.width, margin: this.props.margin }}
          className={`appButton`}
          onClick={event => this.props.onClick(event)}
        >
          {this.props.children}
        </button>
      </div>
    );
  }
}

export default AppButton;
