import React, { Component } from "react";
import colors from "../../config/colors";
import SuperHeroAPI from "../../utils/SuperHeroAPI";
import AppButton from "../AppButton";
import AppInput from "../AppInput";
import IndexPortrait from "../IndexPortrait";

class TeamSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamMember: {},
      searchField: ``,
      filteredResults: [],
      roster: [],
    };
  }

  componentDidMount() {
    this.setState({ roster: this.props.roster });
  }

  clearForm = () => {
    document.getElementById(`team-member-search`).value = ``;
    this.setState({ searchField: ``, filteredResults: [], filtered: false });
  };

  handleChange = (event, stateKey) => {
    this.setState({ [stateKey]: event.target.value });
  };

  handleSubmit = () => {
    const filtered = this.state.roster.filter(character =>
      character.name
        .toLowerCase()
        .includes(this.state.searchField.toLowerCase())
    );
    this.setState({ filteredResults: filtered, filtered: true });
  };

  confirmTeamMember = () => {
    this.props.addToTeam(this.state.teamMember);
    this.props.toggleTeamSelector();
  };

  changeTeamMember = () =>
    this.setState({ teamMember: {}, filteredResults: [], filtered: false });

  getTeamMember = id => {
    SuperHeroAPI.loadContender(id)
      .then(response => this.setState({ teamMember: response.data }))
      .catch(err => console.error(err));
  };

  render() {
    return (
      <div>
        <h4>Choose Your Team Member</h4>
        {!this.state.teamMember.name && (
          <div
            style={{
              display: `flex`,
              justifyContent: `space-around`,
              flexWrap: `wrap`,
            }}
          >
            <AppButton onClick={this.clearForm}>Clear</AppButton>
            <AppInput
              id={`team-member-search`}
              backgroundColor={colors.extraLightPrimary}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              fieldName={`searchField`}
            />
            <AppButton onClick={this.handleSubmit}>Search</AppButton>
          </div>
        )}
        {this.state.teamMember.name && (
          <div
            style={{
              display: `flex`,
              justifyContent: `center`,
              flexDirection: `column`,
            }}
          >
            <div style={{ cursor: `pointer`, marginBottom: `20px` }}>
              <IndexPortrait
                character={this.state.teamMember}
                onClick={this.confirmTeamMember}
                round
                showStats
              />
            </div>
            <div
              style={{
                display: `flex`,
                justifyContent: `space-around`,
                flexWrap: `wrap`,
              }}
            >
              <AppButton
                width={`200px`}
                margin={`10px 0px`}
                onClick={this.confirmTeamMember}
              >
                Confirm {this.state.teamMember.name}!
              </AppButton>
              <AppButton
                width={`200px`}
                margin={`10px 0px`}
                onClick={this.changeTeamMember}
              >
                Choose Another Team Member
              </AppButton>
            </div>
          </div>
        )}
        {!this.state.teamMember.name &&
          (this.state.filteredResults.length < 1 && !this.state.filtered
            ? this.props.roster.map((character, index) => (
                <div key={index} style={{ margin: `10px 0px` }}>
                  {index !== 0 && <hr />}
                  <IndexPortrait
                    character={character}
                    onClick={this.getTeamMember}
                    round
                    showStats
                  />
                </div>
              ))
            : this.state.filteredResults.map((character, index) => (
                <div key={index} style={{ margin: `10px 0px` }}>
                  {index !== 0 && <hr />}
                  <IndexPortrait
                    character={character}
                    onClick={this.getTeamMember}
                    round
                    showStats
                  />
                </div>
              )))}
        {!this.state.teamMember.name &&
          this.state.filteredResults.length < 1 &&
          this.state.filtered && (
            <div>
              <p>Search Returned No Results!</p>
            </div>
          )}

        <div style={{ display: `flex`, justifyContent: `center` }}>
          <AppButton
            margin={`10px auto`}
            onClick={() => this.props.toggleTeamSelector()}
            width={`200px`}
          >
            Back To Team
          </AppButton>
        </div>
      </div>
    );
  }
}

export default TeamSelection;
