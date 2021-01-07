import React, { Component } from "react";
import PropertyValue from "../PropertyValue";

class Work extends Component {
  styles = {
    headerContainer: { marginBottom: `10px` },
  };

  render() {
    const work = this.props.work;
    return (
      <div>
        <div style={this.styles.headerContainer}>
          <h3>Work:</h3>
        </div>
        <PropertyValue property={`Occupation`} value={work.occupation} />
        <PropertyValue property={`Based`} value={work.base} />
      </div>
    );
  }
}

export default Work;
