import React, { Component } from "react";
import SuperHeroAPI from "../../../utils/SuperHeroAPI";
import IndexPortrait from "../../IndexPortrait";
import AppInput from "../../AppInput";
import AppButton from "../../AppButton";
import colors from "../../../config/colors";

class GetDefenderSolo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defender: {},
      searchField: ``,
      filteredResults: [],
    };
  }
  componentDidMount() {
    if (this.props.rematch) {
      this.props.setDefendingTeam(this.props.previousTeam);
      this.props.changePhase(1);
    }
  }

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

  clearForm = () => {
    document.getElementById(`defender-search`).value = ``;
    this.setState({ searchField: ``, filteredResults: [], filtered: false });
  };

  getDefender = id => {
    SuperHeroAPI.loadContender(id)
      .then(response => this.setState({ defender: response.data }))
      .catch(err => console.error(err));
  };

  confirmDefender = () => {
    this.props.setDefendingTeam([this.state.defender]);
    this.props.changePhase(1);
  };

  changeDefender = () =>
    this.setState({ defender: {}, filteredResults: [], filtered: false });

  render() {
    return (
      <div>
        <h4>Choose Your Fighter</h4>
        {!this.state.defender.name && (
          <div>
            <div
              style={{
                display: `flex`,
                justifyContent: `space-around`,
                flexWrap: `wrap`,
                marginBottom: `20px`,
              }}
            >
              <AppButton onClick={this.clearForm}>Clear</AppButton>
              <AppInput
                id={`defender-search`}
                backgroundColor={colors.extraLightPrimary}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                fieldName={`searchField`}
              />
              <AppButton onClick={this.handleSubmit}>Search</AppButton>
            </div>
            <div>
              <hr />
            </div>
          </div>
        )}
        {this.state.defender.name && (
          <div
            style={{
              display: `flex`,
              justifyContent: `center`,
              flexDirection: `column`,
            }}
          >
            <div style={{ cursor: `pointer`, marginBottom: `20px` }}>
              <IndexPortrait
                character={this.state.defender}
                onClick={this.confirmDefender}
                round
                showStats
              />
            </div>
            <div
              style={{
                display: `flex`,
                justifyContent: `space-around`,
                flexWrap: `wrap-reverse`,
              }}
            >
              <AppButton
                width={`200px`}
                margin={`10px 0px`}
                onClick={this.changeDefender}
              >
                Choose Another Defender
              </AppButton>
              <AppButton
                width={`200px`}
                margin={`10px 0px`}
                onClick={this.confirmDefender}
              >
                Confirm {this.state.defender.name}!
              </AppButton>
            </div>
          </div>
        )}
        {!this.state.defender.name &&
          (this.state.filteredResults.length < 1 && !this.state.filtered
            ? this.props.roster.map((character, index) => (
                <div key={index} style={{ margin: `10px 0px` }}>
                  {index !== 0 && <hr />}
                  <IndexPortrait
                    character={character}
                    onClick={this.getDefender}
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
                    onClick={this.getDefender}
                    round
                    showStats
                  />
                </div>
              )))}
        {!this.state.defender.name &&
          this.state.filteredResults.length < 1 &&
          this.state.filtered && (
            <div>
              <p>Search Returned No Results!</p>
            </div>
          )}
        <div style={{ display: `flex`, justifyContent: `center` }}>
          <AppButton
            margin={`10px auto`}
            onClick={() => this.props.changePhase(-1)}
            width={`200px`}
          >
            Back
          </AppButton>
        </div>
      </div>
    );
  }
}

export default GetDefenderSolo;
