import React, { Component } from "react";
import PropertyValue from "../PropertyValue";
import ToggleSwitch from "../../ToggleSwitch";

class Appearance extends Component {
  constructor(props) {
    super(props);
    this.state = { isImperial: true };
  }

  styles = {
    headerContainer: { marginBottom: `10px` },
  };

  toggleUnits = () => this.setState({ isImperial: !this.state.isImperial });

  render() {
    const appearance = this.props.appearance;
    return (
      <div>
        <div style={this.styles.headerContainer}>
          <h3>Appearance:</h3>
          <ToggleSwitch
            height={`50px`}
            leftText={`Imperial`}
            rightText={`Metric`}
            toggleFunction={this.toggleUnits}
          />
        </div>
        <PropertyValue property={`Eye-color`} value={appearance[`eye-color`]} />
        <PropertyValue property={`Gender`} value={appearance.gender} />
        <PropertyValue
          property={`Hair-color`}
          value={appearance[`hair-color`]}
        />
        <PropertyValue
          property={`Height`}
          value={
            this.state.isImperial ? appearance.height[0] : appearance.height[1]
          }
        />
        <PropertyValue property={`Race`} value={appearance.race} />
        <PropertyValue
          property={`Weight`}
          value={
            this.state.isImperial ? appearance.weight[0] : appearance.weight[1]
          }
        />
      </div>
    );
  }
}

export default Appearance;
