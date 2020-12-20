import React, { Component } from "react";
import colors from "../../config/colors";

class Footer extends Component {
  styles = {
    container: {
      backgroundColor: colors.primary,
      borderTop: `1px solid ${colors.secondary}`,
      marginTop: `auto`,
      paddingTop: `5px`,
    },
    linkText: {
      color: colors.lightPrimary,
      textDecoration: `none`,
    },
    text: {
      textAlign: `center`,
    },
  };

  render() {
    return (
      <div style={this.styles.container}>
        <p style={this.styles.text}>
          <a
            href={`https://agtravis.github.io/portfolio/`}
            style={this.styles.linkText}
            target={`_blank`}
          >
            &copy;2020 Alexander George Travis
          </a>
        </p>
      </div>
    );
  }
}

export default Footer;
