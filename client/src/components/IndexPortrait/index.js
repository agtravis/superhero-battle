import React, { Component } from "react";
import colors from "../../config/colors";
// import { Link } from "react-router-dom";

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

  styles = {
    image: {
      objectFit: this.props.size ? `scale-down` : `none`,
      objectPosition: `center top`,
      width: this.props.size ? `${this.props.size}px` : `300px`,
      height: this.props.size ? `${this.props.size}px` : `300px`,
      borderRadius: this.props.round
        ? `${this.props.size ? this.props.size / 2 : 150}px`
        : `0px`,
    },
    textContainer: {},
    textContainerBackground: {},
  };

  render() {
    return (
      <div>
        {/*{this.props.title ? (*/}
        <div>
          <div>
            {this.state.imageValid ? (
              <div
                style={{
                  position: `relative`,
                  display: `flex`,
                  justifyContent: `center`,
                }}
              >
                <div>
                  <img
                    src={
                      this.props.character
                        ? this.props.character.image.url
                        : this.props.image
                    }
                    alt={
                      this.props.character
                        ? this.props.character.name
                        : this.props.name
                    }
                    onError={() => this.noImage()}
                    style={this.styles.image}
                  />
                </div>
                <div
                  style={{
                    alignItems: `center`,
                    backgroundColor: colors.white,
                    border: `1px solid ${colors.darkSecondary}`,
                    borderRadius: `500px`,
                    display: `flex`,
                    height: `50px`,
                    justifyContent: `center`,
                    opacity: `0.4`,
                    padding: `5px`,
                    position: `absolute`,
                    top: `${this.props.size ? this.props.size / 2 : 150}px`,
                    width: `200px`,
                  }}
                ></div>
                <div
                  style={{
                    alignItems: `center`,
                    border: `1px solid ${colors.darkSecondary}`,
                    borderRadius: `500px`,
                    display: `flex`,
                    height: `50px`,
                    justifyContent: `center`,
                    padding: `5px`,
                    position: `absolute`,
                    top: `${this.props.size ? this.props.size / 2 : 150}px`,
                    width: `200px`,
                  }}
                >
                  <p style={{ marginBottom: `0`, fontWeight: `900` }}>
                    {this.props.character
                      ? this.props.character.name
                      : this.props.name}
                  </p>
                </div>
              </div>
            ) : (
              <p>No image on file!</p>
            )}
          </div>
        </div>
        {/*}) : (
          <div>
            <p>Nobody in your Roster!</p>
            <p>
              Click <Link to={`/roster`}>here</Link> to get a team captain!
            </p>
          </div>
        )}*/}
      </div>
    );
  }
}

export default IndexPortrait;
