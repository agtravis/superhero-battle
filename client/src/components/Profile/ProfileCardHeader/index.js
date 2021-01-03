import React, { Component } from "react";

class ProfileCardHeader extends Component {
  styles = {
    text: { textAlign: `center` },
  };

  render() {
    return <h3 style={this.styles.text}>{this.props.children}</h3>;
  }
}

export default ProfileCardHeader;
