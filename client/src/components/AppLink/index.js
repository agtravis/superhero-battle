import React, { Component } from "react";
import "./style.css";

class AppLink extends Component {
  render() {
    return (
      <div>
        <p className={`appLink`} onClick={this.props.onClick}>
          {this.props.children}
        </p>
      </div>
    );
  }
}

export default AppLink;
