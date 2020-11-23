import React, { Component } from "react";

import "./style.css";

class AppLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    };
  }

  render() {
    return (
      <div>
        <p
          style={{
            transform: this.props.transform,
            width: this.props.width,
          }}
          className={`appLink`}
          onClick={this.props.onClick}
        >
          {this.props.children}
        </p>
      </div>
    );
  }
}

export default AppLink;
