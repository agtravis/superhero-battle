import React, { Component } from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  ButtonFirst,
  ButtonLast,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
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
      page: 1,
    };
  }

  styles = {
    basicInfo: {
      padding: `25px 15px 0px`,
    },
    buttonsContainer: {
      display: `flex`,
      justifyContent: `space-evenly`,
      marginTop: `20px`,
    },
    pagination: {
      marginBottom: `50px`,
      textAlign: `center`,
    },
    slideContainers: {
      padding: `25px 5px 0px`,
    },
  };

  changePage = direction => {
    if (direction === `up` && this.state.page < 5) {
      this.setState({ page: this.state.page + 1 });
    } else if (direction === `down` && this.state.page > 1) {
      this.setState({ page: this.state.page - 1 });
    } else if (direction === `start`) {
      this.setState({ page: 1 });
    } else if (direction === `end`) {
      this.setState({ page: 5 });
    }
  };

  render() {
    return (
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={5}
      >
        <div style={this.styles.buttonsContainer}>
          <ButtonFirst
            onClick={() => this.changePage(`start`)}
            className={`appButton-carousel`}
          >{`|<`}</ButtonFirst>
          <ButtonBack
            onClick={() => this.changePage(`down`)}
            className={`appButton-carousel`}
          >{`<<`}</ButtonBack>
          <ButtonNext
            onClick={() => this.changePage(`up`)}
            className={`appButton-carousel`}
          >{`>>`}</ButtonNext>
          <ButtonLast
            onClick={() => this.changePage(`end`)}
            className={`appButton-carousel`}
          >{`>|`}</ButtonLast>
        </div>
        <div style={this.styles.pagination}>
          <p>{this.state.page} / 5</p>
        </div>
        <Slider>
          <Slide index={0}>
            <div style={this.styles.basicInfo}>
              <BasicInfo
                profileData={this.props.profileData}
                signedInVsGeneric={this.props.signedInVsGeneric}
              />
            </div>
          </Slide>
          <Slide index={1}>
            <Captain
              profileData={this.props.profileData}
              signedInVsGeneric={this.props.signedInVsGeneric}
            />
          </Slide>
          <Slide index={2}>
            <LatestRecruit
              profileData={this.props.profileData}
              signedInVsGeneric={this.props.signedInVsGeneric}
            />
          </Slide>
          <Slide index={3}>
            <div style={this.styles.slideContainers}>
              <LastBattle
                profileData={this.props.profileData}
                signedInVsGeneric={this.props.signedInVsGeneric}
              />
            </div>
          </Slide>
          <Slide index={4}>
            <div style={this.styles.slideContainers}>
              <CurrentTeam
                profileData={this.props.profileData}
                signedInVsGeneric={this.props.signedInVsGeneric}
              />
            </div>
          </Slide>
        </Slider>
      </CarouselProvider>
    );
  }
}

export default ProfileMobile;
