import React, { Component } from "react";
import AppButton from "../../AppButton";
import IndexPortrait from "../../IndexPortrait";
import SearchForm from "../../SearchForm";

class FilterForm extends Component {
  styles = {
    chosenButtonsContainer: {
      display: `flex`,
      justifyContent: `space-around`,
      flexWrap: `wrap-reverse`,
    },
    chosenContainer: {
      display: `flex`,
      flexDirection: `column`,
      justifyContent: `center`,
    },
    filteredButtonsContainer: { display: `flex`, justifyContent: `center` },
    filteredContainer: { margin: `10px 0px` },
    imageContainer: { cursor: `pointer`, marginBottom: `20px` },
  };

  render() {
    return (
      <div>
        <h4>Choose Your {this.props.title}</h4>
        {!this.props.character.name && (
          <div>
            <SearchForm
              clearForm={this.props.clearForm}
              fieldName={this.props.fieldName}
              handleChange={this.props.handleChange}
              handleSubmit={this.props.handleSubmit}
              id={this.props.id}
            />
            <div>
              <hr />
            </div>
          </div>
        )}
        {this.props.character.name && (
          <div style={this.styles.chosenContainer}>
            <div style={this.styles.imageContainer}>
              <IndexPortrait
                character={this.props.character}
                onClick={this.props.confirmCharacter}
                round
                showStats
              />
            </div>
            <div style={this.styles.chosenButtonsContainer}>
              <AppButton
                id={`change-character-button`}
                margin={`10px 0px`}
                onClick={this.props.changeCharacter}
                width={`200px`}
              >
                Choose Another {this.props.title}
              </AppButton>
              <AppButton
                id={`confirm-character-button`}
                margin={`10px 0px`}
                onClick={this.props.confirmCharacter}
                width={`200px`}
              >
                Confirm {this.props.character.name}!
              </AppButton>
            </div>
          </div>
        )}
        {!this.props.character.name &&
          (this.props.filteredResults.length < 1 && !this.props.filtered
            ? this.props.roster.map((character, index) => (
                <div key={index} style={this.styles.filteredContainer}>
                  {index !== 0 && <hr />}
                  <IndexPortrait
                    character={character}
                    onClick={this.props.getCharacter}
                    round
                    showStats
                  />
                </div>
              ))
            : this.props.filteredResults.map((character, index) => (
                <div key={index} style={this.styles.filteredContainer}>
                  {index !== 0 && <hr />}
                  <IndexPortrait
                    character={character}
                    onClick={this.props.getCharacter}
                    round
                    showStats
                  />
                </div>
              )))}
        {!this.props.character.name &&
          this.props.filteredResults.length < 1 &&
          this.props.filtered && (
            <div>
              <p>Search Returned No Results!</p>
            </div>
          )}
        <div style={this.styles.filteredButtonsContainer}>
          {this.props.changePhase ? (
            <AppButton
              id={`filter-form-back-button`}
              margin={`10px auto`}
              onClick={() => this.props.changePhase(-1)}
              width={`200px`}
            >
              Back
            </AppButton>
          ) : (
            <AppButton
              id={`filter-form-back-to-team-button`}
              margin={`10px auto`}
              onClick={() => this.props.toggleTeamSelector()}
              width={`200px`}
            >
              Back To Team
            </AppButton>
          )}
        </div>
      </div>
    );
  }
}

export default FilterForm;
