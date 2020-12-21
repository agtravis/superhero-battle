import React, { Component } from "react";
import { TailSpin } from "@agney/react-loading";

class LoadingAnimation extends Component {
  render() {
    return (
      <div
        style={{
          alignItems: `center`,
          height: this.props.divHeight ? `${this.props.divHeight}px` : `auto`,
          display: `flex`,
          justifyContent: `center`,
        }}
      >
        <TailSpin
          className={`loading-animation`}
          width={`${this.props.size}`}
        />
      </div>
    );
  }
}

export default LoadingAnimation;
