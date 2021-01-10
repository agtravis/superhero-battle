import React, { Component } from "react";
import PageTitle from "../components/PageTitle";

class NotFound extends Component {
  styles = {
    mockLink: { fontWeight: `900`, cursor: `pointer` },
  };

  render() {
    return (
      <div>
        <PageTitle>Page Not Found</PageTitle>
        <p>
          Could not find <em>{this.props.location.pathname}</em>. Please{` `}
          <span
            onClick={() => this.props.history.goBack()}
            style={this.styles.mockLink}
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
