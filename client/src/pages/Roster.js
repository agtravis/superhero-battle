import React, { Component } from "react";
import API from "../utils/API";
import SuperHeroAPI from "../utils/SuperHeroAPI";
import AppButton from "../components/AppButton";
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
    buttonsContainer: {
      display: `flex`,
      flexWrap: `wrap`,
      justifyContent: `space-evenly`,
    },
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

  sortRoster = direction => {
    const roster = [...this.state.roster];
    if (direction === `a-z`) {
      roster.sort((a, b) => (a.name > b.name ? 1 : -1));
    } else {
      roster.sort((a, b) => (a.name > b.name ? -1 : 1));
    }
    this.setState({ roster: roster });
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
                <div>
                  <div style={this.styles.buttonsContainer}>
                    <AppButton
                      id={`recruitment`}
                      margin={`10px 5px`}
                      onClick={this.loadRoster}
                      width={`170px`}
                    >
                      Recruitment Date
                    </AppButton>
                    <AppButton
                      id={`a-z`}
                      margin={`10px 5px`}
                      onClick={() => this.sortRoster(`a-z`)}
                      width={`170px`}
                    >
                      A-Z
                    </AppButton>
                    <AppButton
                      id={`z-a`}
                      margin={`10px 5px`}
                      onClick={() => this.sortRoster(`z-a`)}
                      width={`170px`}
                    >
                      Z-A
                    </AppButton>
                  </div>
                  <RosterExists roster={this.state.roster} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Roster;
