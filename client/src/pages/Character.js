import React, { Component } from "react";
import API from "../utils/API";
import AppButton from "../components/AppButton";
import Appearance from "../components/CharacterFlow/Appearance";
import Biography from "../components/CharacterFlow/Biography";
import Connections from "../components/CharacterFlow/Connections";
import ImageAndStats from "../components/CharacterFlow/ImageAndStats";
import Work from "../components/CharacterFlow/Work";
import PageTitle from "../components/PageTitle";
import { Redirect } from "react-router-dom";

class Character extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characterId: null,
      inUserRoster: false,
      isCaptain: false,
      redirect: null,
    };
  }

  componentDidMount() {
    API.getUserDetails(this.props.currentUser._id)
      .then(response => {
        this.inRoster(
          this.props.location.state.character._id,
          response.data.roster
        );
      })
      .catch(err => console.error(err));
  }

  styles = {
    subTitle: {
      display: `flex`,
      justifyContent: `center`,
      textAlign: `center`,
    },
  };

  inRoster = (characterId, roster) => {
    if (roster[0]._id === characterId) {
      this.setState({ isCaptain: true });
    } else {
      for (let i = 1; i < roster.length; ++i) {
        if (roster[i]._id === characterId) {
          this.setState({ inUserRoster: true, characterId: characterId });
          break;
        }
      }
    }
  };

  makeCaptain = () => {
    API.makeCaptain(this.props.currentUser._id, this.state.characterId)
      .then(() => {
        this.setState({ redirect: `/roster` });
      })
      .catch(err => console.error(err));
  };

  render() {
    if (!this.props.currentUser) {
      window.location.href = `/`;
    }
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    const character = this.props.location.state.character;
    return (
      <div>
        <div>
          <PageTitle>{character.name}</PageTitle>
          {this.state.inUserRoster && (
            <div style={this.styles.subTitle}>
              <AppButton id={`make-captain`} onClick={() => this.makeCaptain()}>
                Make Captain
              </AppButton>
            </div>
          )}
          {this.state.isCaptain && (
            <div style={this.styles.subTitle}>
              <p>This is your current team captain</p>
            </div>
          )}
        </div>
        <hr />
        <ImageAndStats character={character} />
        <hr />
        <Biography biography={character.biography} />
        <hr />
        <Work work={character.work} />
        <hr />
        <Connections connections={character.connections} />
        <hr />
        <Appearance appearance={character.appearance} />
      </div>
    );
  }
}

export default Character;
