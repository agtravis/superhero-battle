import React, { Component } from "react";

class ToggleSignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <br />
        <p>
          Or{" "}
          <button onClick={() => this.props.signUp()}>
            {this.props.buttonName}
          </button>
          {this.props.text}
        </p>{" "}
      </>
    );
  }
}

export default ToggleSignIn;
