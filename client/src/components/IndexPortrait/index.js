import React, { Component } from "react";
import { Breakpoint } from "react-socks";
import IndexPortraitImage from "../IndexPortraitImage";
import IndexPortraitStats from "../IndexPortraitStats";
import IndexPortraitStatsMobile from "../IndexPortraitStatsMobile";

class IndexPortrait extends Component {
  styles = {
    container: {
      cursor: this.props.onClick ? `pointer` : null,
    },
    imageContainer: {
      alignItems: `center`,
      display: `flex`,
      justifyContent: `space-around`,
    },
  };

  render() {
    return (
      <div>
        <div>
          <div
            onClick={
              this.props.onClick
                ? () => this.props.onClick(this.props.character._id)
                : null
            }
            style={this.styles.container}
          >
            <Breakpoint medium up>
              <div style={this.styles.imageContainer}>
                <IndexPortraitImage
                  character={this.props.character}
                  image={this.props.image}
                  name={this.props.name}
                  round={this.props.round}
                  size={this.props.size}
                />
                {this.props.showStats && (
                  <div>
                    <IndexPortraitStats character={this.props.character} />
                  </div>
                )}
              </div>
            </Breakpoint>
            <Breakpoint small down>
              <div style={this.styles.imageContainer}>
                <IndexPortraitImage
                  character={this.props.character}
                  image={this.props.image}
                  name={this.props.name}
                  round={this.props.round}
                  size={this.props.size}
                />
              </div>
            </Breakpoint>
            {this.props.showStats && (
              <Breakpoint small down>
                <IndexPortraitStatsMobile character={this.props.character} />
              </Breakpoint>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default IndexPortrait;
