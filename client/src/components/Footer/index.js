import React, { Component } from "react";
import colors from "../../config/colors";

class Footer extends Component {
  render() {
    return (
      <div
        style={{
          marginTop: `auto`,
          borderTop: `1px solid ${colors.secondary}`,
          paddingTop: `5px`,
          backgroundColor: colors.primary,
        }}
      >
        <p
          style={{
            textAlign: `center`,
          }}
        >
          <a
            style={{
              color: colors.lightPrimary,
              textDecoration: `none`,
              textAlign: `center`,
            }}
            href={`https://agtravis.github.io/portfolio/`}
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
