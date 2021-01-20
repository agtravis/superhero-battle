import React, { Component } from "react";
import VerticalSpacer from "../../VerticalSpacer";

class Logo extends Component {
  styles = { logoImageContainer: { position: `absolute`, top: `0px` } };

  render() {
    return (
      <div>
        <VerticalSpacer height={120} />
        <div style={this.styles.logoImageContainer}>
          <img
            alt={`spider-man`}
            height={120}
            src={`/spiderman_mcfarlane.png`}
          />
        </div>
      </div>
    );
  }
}

export default Logo;
