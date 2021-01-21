import React, { Component } from "react";

class PageTitle extends Component {
  styles = {
    text: { textAlign: `center` },
  };

  render() {
    return <h1 style={this.styles.text}>{this.props.children}</h1>;
  }
}

export default PageTitle;
