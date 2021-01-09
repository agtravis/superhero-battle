import React, { Component } from "react";
import "./style.css";
import BasicInfo from "../ProfileComponents/BasicInfo";
import Captain from "../ProfileComponents/Captain";
import LatestRecruit from "../ProfileComponents/LatestRecruit";
import LastBattle from "../ProfileComponents/LastBattle";
import CurrentTeam from "../ProfileComponents/CurrentTeam";

class ProfileMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interval: null,
      page: 1,
    };
  }

  styles = {
    basicInfo: {
      padding: `0px 15px`,
    },
    buttonsContainer: {
      display: `flex`,
      justifyContent: `space-evenly`,
      marginTop: `20px`,
    },
    mockLink: { cursor: `pointer` },
    pagination: {
      textAlign: `center`,
    },
    slideContainers: {
      padding: `25px 5px 0px`,
    },
  };

  componentDidMount() {
    const controlDiv = document.getElementById(`profile-buttons`);
    controlDiv.addEventListener(`click`, () => {
      clearInterval(interval);
    });
    const interval = setInterval(() => {
      this.changePage(`up`);
    }, 3000);
    this.setState({ interval: interval });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  changePage = direction => {
    if (direction === `up`) {
      if (this.state.page < 4) {
        this.setState({ page: this.state.page + 1 });
      } else {
        this.setState({ page: 1 });
      }
    } else if (direction === `down`) {
      if (this.state.page > 1) {
        this.setState({ page: this.state.page - 1 });
      } else {
        this.setState({ page: 4 });
      }
    } else if (direction === `start`) {
      this.setState({ page: 1 });
    } else if (direction === `end`) {
      this.setState({ page: 4 });
    }
  };

  render() {
    return (
      <div>
        <div id={`profile-buttons`} style={this.styles.buttonsContainer}>
          <p
            style={this.styles.mockLink}
            onClick={() => this.changePage(`start`)}
            className={`appButton-carousel`}
          >{`|<`}</p>
          <p
            style={this.styles.mockLink}
            onClick={() => this.changePage(`down`)}
            className={`appButton-carousel`}
          >{`<<`}</p>
          <p
            style={this.styles.mockLink}
            onClick={() => this.changePage(`up`)}
            className={`appButton-carousel`}
          >{`>>`}</p>
          <p
            style={this.styles.mockLink}
            onClick={() => this.changePage(`end`)}
            className={`appButton-carousel`}
          >{`>|`}</p>
        </div>
        <div style={this.styles.pagination}>
          <p>{this.state.page} / 4</p>
        </div>
        {this.state.page === 1 && (
          <div style={this.styles.basicInfo}>
            <BasicInfo
              profileData={this.props.profileData}
              signedInVsGeneric={this.props.signedInVsGeneric}
            />
            <LastBattle
              profileData={this.props.profileData}
              signedInVsGeneric={this.props.signedInVsGeneric}
            />
          </div>
        )}

        {this.state.page === 2 && (
          <Captain
            profileData={this.props.profileData}
            signedInVsGeneric={this.props.signedInVsGeneric}
          />
        )}

        {this.state.page === 3 && (
          <LatestRecruit
            profileData={this.props.profileData}
            signedInVsGeneric={this.props.signedInVsGeneric}
          />
        )}
        {this.state.page === 4 && (
          <div style={this.styles.slideContainers}>
            <CurrentTeam
              profileData={this.props.profileData}
              signedInVsGeneric={this.props.signedInVsGeneric}
            />
          </div>
        )}
      </div>
    );
  }
}

export default ProfileMobile;
