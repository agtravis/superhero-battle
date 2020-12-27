import React, { Component } from "react";
import API from "../utils/API";
import SuperHeroAPI from "../utils/SuperHeroAPI";
import CharacterLoaded from "../components/RosterFlow/CharacterLoaded";
import LoadingAnimation from "../components/LoadingAnimation";
import PageTitle from "../components/PageTitle";
import Prestige from "../components/RosterFlow/Prestige";
import RosterEmpty from "../components/RosterFlow/RosterEmpty";
import RosterExists from "../components/RosterFlow/RosterExists";

class Roster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newCharacter: null,
      newCharacterLoaded: false,
      redirect: false,
      roster: [],
      rosterLoaded: false,
    };
  }

  componentDidMount() {
    this.loadRoster();
  }

  styles = {
    container: {
      display: `flex`,
      justifyContent: `center`,
      flexDirection: `column`,
    },
    text: { textAlign: `center` },
  };

  addToRoster = () => {
    API.addCharacterToRoster(this.props.currentUser._id, {
      characterId: this.state.newCharacter._id,
    })
      .then(() => {
        this.setState({ rosterLoaded: false });
        this.props.fillUser();
        this.loadRoster();
      })
      .catch(err => console.error(err));
  };

  getFirstTeamMember = () => {
    SuperHeroAPI.getRandomNewCharacter()
      .then(randomCharacter => {
        this.setState({
          newCharacter: randomCharacter.data[0],
          newCharacterLoaded: true,
        });
      })
      .catch(err => console.error(err));
  };

  loadRoster = () => {
    API.getUserDetails(this.props.currentUser._id)
      .then(response =>
        this.setState({ rosterLoaded: true, roster: response.data.roster })
      )
      .catch(err => console.error(err));
  };

  prestige = () => {
    API.prestige(this.props.currentUser._id)
      .then(() => {
        this.setState({ rosterLoaded: false });
        this.props.fillUser();
        this.loadRoster();
      })
      .catch(err => console.error(err));
  };

  render() {
    if (!this.props.currentUser) {
      window.location.href = `/`;
    }
    return (
      <div>
        <PageTitle>Your Roster</PageTitle>
        {!this.state.rosterLoaded ? (
          <LoadingAnimation divHeight={400} size={150} />
        ) : (
          <div style={this.styles.container}>
            <p style={this.styles.text}>
              ({this.state.roster.length}
              /731 recruited ||{` `}
              {((this.state.roster.length / 731) * 100).toFixed(2)}% complete)
            </p>
            {this.state.roster.length >= 731 && (
              <div>
                <Prestige roster={this.state.roster} prestige={this.prestige} />
                <hr />
              </div>
            )}
            <div>
              {this.state.roster.length < 1 ? (
                <div>
                  {!this.state.newCharacterLoaded ? (
                    <RosterEmpty getFirstTeamMember={this.getFirstTeamMember} />
                  ) : (
                    <CharacterLoaded
                      newCharacter={this.state.newCharacter}
                      addToRoster={this.addToRoster}
                    />
                  )}
                </div>
              ) : (
                <RosterExists roster={this.state.roster} />
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Roster;
