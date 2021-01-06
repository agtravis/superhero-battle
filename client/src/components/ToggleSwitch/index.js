import React, { Component } from "react";
import colors from "../../config/colors";
import "./style.css";

class ToggleSwitch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLeft: true,
    };
  }

  styles = {
    container: {
      alignItems: `center`,
      display: `flex`,
      height: this.props.height,
      justifyContent: `center`,
      margin: `auto`,
      width: `75%`,
    },
    subContainer: {
      alignItems: `space-around`,
      display: `flex`,
      justifyContent: `center`,
      width: `200px`,
    },
    text: {
      fontSize: `1.5rem`,
      margin: `0px`,
    },
  };

  toggle = () => {
    if (this.state.isLeft) {
      document.getElementById(`left-text`).classList.remove(`switch-bolder`);
      document.getElementById(`right-text`).classList.add(`switch-bolder`);
    } else {
      document.getElementById(`left-text`).classList.add(`switch-bolder`);
      document.getElementById(`right-text`).classList.remove(`switch-bolder`);
    }
    this.setState({ isLeft: !this.state.isLeft });
    this.props.toggleFunction();
  };

  render() {
    return (
      <div style={this.styles.container}>
        <div style={this.styles.subContainer}>
          <p
            className={`switch-bolder`}
            id={`left-text`}
            style={this.styles.text}
          >
            {this.props.leftText}
          </p>
        </div>
        <div style={{ ...this.styles.subContainer, paddingTop: `9px` }}>
          <label className={`switch`}>
            <input
              disabled={this.props.disabled}
              onChange={() => this.toggle()}
              type={`checkbox`}
            />
            <span className={`slider`}></span>
          </label>
        </div>
        <div style={this.styles.subContainer}>
          <p id={`right-text`} style={this.styles.text}>
            <span
              style={{
                color: this.props.disabled && colors.danger,
              }}
            >
              {this.props.rightText}
            </span>
          </p>
        </div>
      </div>
    );
  }
}

export default ToggleSwitch;
