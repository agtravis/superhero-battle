import React, { Component } from "react";
import { Breakpoint } from "react-socks";
import colors from "../../config/colors";

class Screen extends Component {
  styles = {
    fullscreen: {
      // remove border
      border: `1px solid ${colors.secondary}`,
      display: `flex`,
      flexDirection: `column`,
      justifyContent: `center`,
      margin: `60px auto 0`,
      padding: `10px`,
      width: `70%`,
    },
    mobile: {
      overflow: `scroll`,
      padding: `5px`,
      width: `100%`,
    },
  };

  render() {
    return (
      <div>
        <Breakpoint medium up>
          <div style={this.styles.fullscreen}>{this.props.children}</div>
        </Breakpoint>
        <Breakpoint small down>
          <div style={this.styles.mobile}>{this.props.children}</div>
        </Breakpoint>
      </div>
    );
  }
}

export default Screen;
