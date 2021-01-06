import React, { Component } from "react";
import SuperHeroAPI from "../../utils/SuperHeroAPI";
import LoadingAnimation from "../LoadingAnimation";

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLoaded: false,
      imageUrl: ``,
      imageValid: true,
      noCharacter: false,
    };
  }

  componentDidMount() {
    this.loadImage();
  }

  componentDidUpdate(prevProps) {
    if (this.props.name !== prevProps.name) {
      this.loadImage();
    }
  }

  loadImage = () => {
    if (this.props.type === `user` && this.props.image) {
      SuperHeroAPI.loadContender(this.props.image)
        .then(response => {
          if (response.data.image.url) {
            this.setState({
              imageUrl: response.data.image.url,
              imageLoaded: true,
            });
          }
        })
        .catch(err => console.error(err));
    } else if (!this.props.image) {
      this.setState({ noCharacter: true, imageLoaded: true });
    } else if (this.props.type === `hero` && this.props.image) {
      this.setState({
        imageUrl: this.props.image,
        imageLoaded: true,
      });
    }
  };

  noImage = () => {
    this.setState({ imageValid: false });
  };

  styles = {
    container: {
      cursor: `pointer`,
      display: `flex`,
      minHeight: `75px`,
    },
    image: {
      borderRadius: `30px`,
      height: `60px`,
      objectFit: `scale-down`,
      objectPosition: `center top`,
    },
    imageContainer: {
      alignItems: `center`,
      display: `flex`,
      flex: `1`,
      justifyContent: `center`,
    },
    infoContainer: {
      alignItems: `center`,
      display: `flex`,
      flex: `3`,
      justifyContent: `center`,
      textAlign: `center`,
    },
    noImageContainer: {
      alignItems: `center`,
      display: `flex`,
      textAlign: `center`,
    },
    text: { margin: `0px` },
  };

  render() {
    return (
      <div>
        {this.props.index !== 0 && <hr />}
        <div
          style={this.styles.container}
          onClick={() => this.props.onClick(this.props.param)}
        >
          <div style={this.styles.imageContainer}>
            {!this.state.imageLoaded && (
              <LoadingAnimation divHeight={60} size={50} />
            )}
            {this.state.imageLoaded && this.state.imageValid && (
              <img
                src={this.state.imageUrl}
                alt={this.props.name}
                onError={() => this.noImage()}
                style={this.styles.image}
              />
            )}
            {(this.state.noCharacter || !this.state.imageValid) && (
              <div style={this.styles.noImageContainer}>
                <p style={this.styles.text}>N/A</p>
              </div>
            )}
          </div>
          <div style={this.styles.infoContainer}>
            <p style={this.styles.text}>
              {this.props.name}
              {this.props.type === `user` &&
                ` - prestige: ${this.props.prestige}, recruited: ${this.props.rosterLength}, since ${this.props.registered}`}
              {this.props.type === `hero` &&
                (this.props.info === `-`
                  ? ` - no known affiliations.`
                  : ` - affiliations: ${this.props.info}.`)}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchResult;
