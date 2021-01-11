import React, { Component } from "react";
import "./style.css";

class AppButton extends Component {
  hover = () => {
    document
      .getElementById(this.props.id)
      .classList.remove(`translateBackButton`);
    document.getElementById(this.props.id).classList.add(`translateButton`);
  };
  unHover = () => {
    document.getElementById(this.props.id).classList.remove(`translateButton`);
    document.getElementById(this.props.id).classList.add(`translateBackButton`);
  };

  render() {
    return (
      <div>
        <button
          id={this.props.id}
          onMouseEnter={() => this.hover()}
          onMouseLeave={() => this.unHover()}
          value={this.props.value ? this.props.value : undefined}
          style={{ width: this.props.width, margin: this.props.margin }}
          className={`appButton`}
          onClick={
            this.props.value
              ? event => this.props.onClick(event)
              : this.props.onClick
          }
        >
          {this.props.children}
        </button>
      </div>
    );
  }
}

export default AppButton;
