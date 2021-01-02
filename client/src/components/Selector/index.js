import React, { Component } from "react";
import Option from "./Option";
import Select from "./Select";

class Selector extends Component {
  render() {
    return (
      <div>
        <Select onChange={this.props.onChange}>
          {this.props.options.map((option, index) => (
            <Option key={index} title={option.title} value={option.value} />
          ))}
        </Select>
      </div>
    );
  }
}

export default Selector;
