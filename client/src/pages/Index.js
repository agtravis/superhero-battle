import React, { Component } from "react";
import IndexPortrait from "../components/IndexPortrait";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h1>
          Welcome
          {this.props.loggedIn ? ` ${this.props.currentUser.username}` : null}!
        </h1>
        {this.props.loggedIn ? (
          <div>
            <div style={{ display: `flex`, justifyContent: `space-between` }}>
              {this.props.captain ? (
                <IndexPortrait
                  title={`Captain`}
                  image={this.props.captain.image.url}
                  name={this.props.captain.name}
                />
              ) : null}
              {this.props.recruit ? (
                <IndexPortrait
                  title={`Latest Recruit`}
                  image={this.props.recruit.image.url}
                  name={this.props.recruit.name}
                />
              ) : (
                <IndexPortrait title={false} />
              )}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Index;
