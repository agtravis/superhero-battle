import React, { Component } from "react";

class LastBattleImage extends Component {
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
        {this.state.imageValid ? (
          <img
            src={this.props.src}
            style={this.props.style}
            alt={this.props.alt}
            onError={() => this.noImage()}
          />
        ) : (
          <p>N/A</p>
        )}
      </div>
    );
  }
}

export default LastBattleImage;
