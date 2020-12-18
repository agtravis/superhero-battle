import React, { Component } from "react";
import SuperHeroAPI from "../../../utils/SuperHeroAPI";
import FilterForm from "../FilterForm";

class TeamSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredResults: [],
      roster: [],
      searchField: ``,
      teamMember: {},
    };
  }

  componentDidMount() {
    this.setState({ roster: this.props.roster });
  }

  changeTeamMember = () =>
    this.setState({ teamMember: {}, filteredResults: [], filtered: false });

  clearForm = () => {
    document.getElementById(`team-member-search`).value = ``;
    this.setState({ searchField: ``, filteredResults: [], filtered: false });
  };

  confirmTeamMember = () => {
    this.props.addToTeam(this.state.teamMember);
    this.props.toggleTeamSelector();
  };

  getTeamMember = id => {
    SuperHeroAPI.loadContender(id)
      .then(response => this.setState({ teamMember: response.data }))
      .catch(err => console.error(err));
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

  render() {
    return (
      <div>
        <FilterForm
          title={`Team Member`}
          character={this.state.teamMember}
          clearForm={this.clearForm}
          fieldName={`searchField`}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          id={`team-member-search`}
          confirmCharacter={this.confirmTeamMember}
          changeCharacter={this.changeTeamMember}
          filteredResults={this.state.filteredResults}
          filtered={this.state.filtered}
          roster={this.props.roster}
          getCharacter={this.getTeamMember}
          toggleTeamSelector={this.props.toggleTeamSelector}
        />
      </div>
    );
  }
}

export default TeamSelection;
