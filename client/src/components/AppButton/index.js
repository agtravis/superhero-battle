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
    document
      .getElementById(this.props.id)
      .classList.remove(`translateClickButton`);
    document.getElementById(this.props.id).classList.add(`translateBackButton`);
  };
  mouseDown = () => {
    document
      .getElementById(this.props.id)
      .classList.remove(`translateBackButton`);
    document
      .getElementById(this.props.id)
      .classList.add(`translateClickButton`);
  };
  mouseUp = () => {
    document
      .getElementById(this.props.id)
      .classList.remove(`translateClickButton`);
    document.getElementById(this.props.id).classList.add(`translateButton`);
  };

  render() {
    return (
      <div>
        <button
          className={`appButton`}
          id={this.props.id}
          onMouseEnter={() => this.hover()}
          onMouseLeave={() => this.unHover()}
          onMouseDown={() => this.mouseDown()}
          onMouseUp={() => this.mouseUp()}
          onClick={
            this.props.value
              ? event => this.props.onClick(event)
              : this.props.onClick
          }
          style={{
            width: this.props.width ? this.props.width : `200px`,
            margin: this.props.margin ? this.props.margin : `10px 0px`,
          }}
          value={this.props.value ? this.props.value : undefined}
        >
          {this.props.children}
        </button>
      </div>
    );
  }
}

export default AppButton;
