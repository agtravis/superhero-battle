import React, { Component } from "react";
import IndexPortraitStats from "../../IndexPortraitStats";

class ImageAndStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageValid: true,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.name !== prevProps.name) {
      this.setState({ imageValid: true });
    }
  }

  styles = {
    container: {
      alignItems: `center`,
      display: `flex`,
      flexWrap: `wrap`,
      justifyContent: `space-evenly`,
    },
    image: { borderRadius: `10px`, width: `100%` },
    imageContainer: { width: `350px` },
    statsContainer: {
      display: `flex`,
      justifyContent: `center`,
      padding: `20px`,
      width: `200px`,
    },
  };

  noImage = () => {
    this.setState({ imageValid: false });
  };

  render() {
    return (
      <div style={this.styles.container}>
        <div style={this.styles.imageContainer}>
          {this.state.imageValid ? (
            <img
              style={this.styles.image}
              src={this.props.character.image.url}
              alt={this.props.character.name}
              onError={() => this.noImage()}
            />
          ) : (
            <p>No image!</p>
          )}
        </div>
        <div style={this.styles.statsContainer}>
          <IndexPortraitStats character={this.props.character} />
        </div>
      </div>
    );
  }
}

export default ImageAndStats;
