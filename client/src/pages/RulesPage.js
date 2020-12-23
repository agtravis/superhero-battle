import React, { Component } from "react";
import PageTitle from "../components/PageTitle";
import Rules from "../components/Rules";

class RulesPage extends Component {
  render() {
    if (!this.props.currentUser) {
      window.location.href = `/`;
    }
    return (
      <div>
        <PageTitle>Rules of Play</PageTitle>
        <Rules />
      </div>
    );
  }
}

export default RulesPage;
