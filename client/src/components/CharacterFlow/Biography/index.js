import React, { Component } from "react";
import PropertyValue from "../PropertyValue";
import PropertyValues from "../PropertyValues";

class Biography extends Component {
  styles = {
    headerContainer: { marginBottom: `10px` },
  };

  render() {
    const biography = this.props.biography;
    return (
      <div>
        <div style={this.styles.headerContainer}>
          <h3>Biography:</h3>
        </div>
        <PropertyValues property={`Aliases`} values={biography.aliases} />
        <PropertyValue property={`Alignment`} value={biography.alignment} />
        <PropertyValue
          property={`Alter Egos`}
          value={biography[`alter-egos`]}
        />
        <PropertyValue
          property={`First Appearance`}
          value={biography[`first-appearance`]}
        />
        <PropertyValue property={`Full Name`} value={biography[`full-name`]} />
        <PropertyValue
          property={`Place of Birth`}
          value={biography[`place-of-birth`]}
        />
        <PropertyValue property={`Publisher`} value={biography.publisher} />
      </div>
    );
  }
}

export default Biography;
