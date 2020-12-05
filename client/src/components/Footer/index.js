import React, { Component } from "react";
import colors from "../../config/colors";

class Footer extends Component {
  render() {
    return (
      <div
        style={{
          marginTop: `auto`,
          borderTop: `1px solid ${colors.secondary}`,
        }}
      >
        <p>FOOTER</p>
      </div>
    );
  }
}

export default Footer;
