import React, { Component } from "react";

import "./style.css";

class AppButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    };
  }

  render() {
    return (
      <div>
        <button
          style={{ transform: this.props.transform, width: this.props.width }}
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
