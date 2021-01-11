import React, { Component } from "react";
import colors from "../../config/colors";
import AppButton from "../AppButton";
import AppInput from "../AppInput";

class SearchForm extends Component {
  styles = {
    searchFormContainer: {
      display: `flex`,
      flexWrap: `wrap`,
      justifyContent: `space-around`,
      marginBottom: `20px`,
    },
  };

  render() {
    return (
      <div style={this.styles.searchFormContainer}>
        <AppButton
          id={`search-form-clear-button`}
          onClick={this.props.clearForm}
        >
          Clear
        </AppButton>
        <AppInput
          backgroundColor={colors.extraLightPrimary}
          fieldName={this.props.fieldName}
          handleChange={this.props.handleChange}
          handleSubmit={this.props.handleSubmit}
          id={this.props.id}
        />
        <AppButton
          id={`search-form-search-button`}
          onClick={this.props.handleSubmit}
        >
          Search
        </AppButton>
      </div>
    );
  }
}

export default SearchForm;
