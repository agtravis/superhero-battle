import React, { Component } from "react";
import PageTitle from "../components/PageTitle";

class NotFound extends Component {
  render() {
    return (
      <div>
        <PageTitle>Page Not Found</PageTitle>
        <p>
          Could not find <em>{this.props.location.pathname}</em>. Please{` `}
          <span
            onClick={() => this.props.history.goBack()}
            style={{ fontWeight: `900`, cursor: `pointer` }}
          >
            go back
          </span>
          {` `}
          and try again!
        </p>
      </div>
    );
  }
}

export default NotFound;
