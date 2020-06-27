import React, { Component } from "react";
import { Link } from "react-router-dom";

class IndexPortrait extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageValid: true,
    };
  }

  noImage = () => {
    this.setState({ imageValid: false });
  };

  render() {
    return (
      <div>
        {this.props.title ? (
          <div>
            <h2>
              Your {this.props.title}: {this.props.name}
            </h2>
            <div>
              {this.state.imageValid ? (
                <div>
                  <img
                    src={this.props.image}
                    alt={this.props.name}
                    onError={() => this.noImage()}
                    style={{ width: `300px` }}
                  />
                  <p>{this.props.name}</p>
                </div>
              ) : (
                <p>No image on file!</p>
              )}
            </div>
          </div>
        ) : (
          <div>
            <p>Nobody in your Roster!</p>
            <p>
              Click <Link to={`/roster`}>here</Link> to get a team captain!
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default IndexPortrait;
