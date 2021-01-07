import React, { Component } from "react";
import PropertyValue from "../PropertyValue";

class Connections extends Component {
  styles = {
    headerContainer: { marginBottom: `10px` },
  };

  render() {
    const connections = this.props.connections;
    return (
      <div>
        <div style={this.styles.headerContainer}>
          <h3>Connections:</h3>
        </div>
        <PropertyValue
          property={`Group Affiliations`}
          value={connections[`group-affiliation`]}
        />
        <PropertyValue property={`Relatives`} value={connections.relatives} />
      </div>
    );
  }
}

export default Connections;
