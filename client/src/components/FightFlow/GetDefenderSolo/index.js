import React, { Component } from "react";
import SuperHeroAPI from "../../../utils/SuperHeroAPI";
import FilterForm from "../FilterForm";

class GetDefenderSolo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defender: {},
      filtered: false,
      filteredResults: [],
      searchField: ``,
    };
  }

  componentDidMount() {
    if (this.props.rematch) {
      this.props.setDefendingTeam(this.props.previousTeam);
      this.props.changePhase(1);
    }
  }

  changeDefender = () =>
    this.setState({ defender: {}, filteredResults: [], filtered: false });

  clearForm = () => {
    document.getElementById(`defender-search`).value = ``;
    this.setState({ searchField: ``, filteredResults: [], filtered: false });
  };

  confirmDefender = () => {
    this.props.setDefendingTeam([this.state.defender]);
    this.props.changePhase(1);
  };

  getDefender = id => {
    SuperHeroAPI.loadContender(id)
      .then(response => this.setState({ defender: response.data }))
      .catch(err => console.error(err));
  };

  handleChange = (event, stateKey) => {
    this.setState({ [stateKey]: event.target.value });
  };

  handleSubmit = () => {
    const filtered = this.props.roster.filter(character =>
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
          title={`Fighter`}
          character={this.state.defender}
          clearForm={this.clearForm}
          fieldName={`searchField`}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          id={`defender-search`}
          confirmCharacter={this.confirmDefender}
          changeCharacter={this.changeDefender}
          filteredResults={this.state.filteredResults}
          filtered={this.state.filtered}
          roster={this.props.roster}
          getCharacter={this.getDefender}
          changePhase={this.props.changePhase}
        />
      </div>
    );
  }
}

export default GetDefenderSolo;
