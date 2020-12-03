import React, { Component } from "react";
import Rules from "../components/Rules";

class RulesPage extends Component {
  render() {
    if (!this.props.currentUser) {
      window.location.href = `/`;
    }
    return (
      <div>
        <Rules />
      </div>
    );
  }
}

export default RulesPage;
