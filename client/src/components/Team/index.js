import React, { Component } from "react";
import AppButton from "../AppButton";
import IndexPortrait from "../IndexPortrait";
import IndexPortraitSmall from "../IndexPortraitSmall";

class Team extends Component {
  styles = {
    captainButtonContainer: { display: `flex`, justifyContent: `center` },
    lowerCharactersContainer: {
      display: `flex`,
      justifyContent: `space-between`,
      marginTop: `-35px`,
    },
  };

  render() {
    return (
      <div>
        {this.props.team[0] ? (
          <div>
            <IndexPortrait character={this.props.team[0]} size={150} />
            {this.props.onClickRemove && (
              <div style={this.styles.captainButtonContainer}>
                <AppButton
                  id={`team-remove-one-button`}
                  onClick={() =>
                    this.props.onClickRemove(this.props.team[0]._id)
                  }
                >
                  Remove
                </AppButton>
              </div>
            )}
          </div>
        ) : this.props.onClickAdd ? (
          <div>
            <p>add</p>
          </div>
        ) : null}
        <div style={this.styles.lowerCharactersContainer}>
          <div>
            {this.props.team[1] && (
              <div>
                <IndexPortraitSmall
                  left
                  src={this.props.team[1].image.url}
                  name={this.props.team[1].name}
                />
                {this.props.onClickRemove && (
                  <div>
                    <AppButton
                      id={`team-remove-two-button`}
                      width={`100px`}
                      onClick={() =>
                        this.props.onClickRemove(this.props.team[1]._id)
                      }
                    >
                      Remove
                    </AppButton>
                  </div>
                )}
              </div>
            )}
          </div>
          <div>
            {this.props.team[2] && (
              <div>
                <IndexPortraitSmall
                  right
                  src={this.props.team[2].image.url}
                  name={this.props.team[2].name}
                />
                {this.props.onClickRemove && (
                  <div>
                    <AppButton
                      id={`team-remove-three-button`}
                      width={`100px`}
                      onClick={() =>
                        this.props.onClickRemove(this.props.team[2]._id)
                      }
                    >
                      Remove
                    </AppButton>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Team;
