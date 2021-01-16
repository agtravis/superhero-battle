import React, { Component } from "react";
import colors from "../../config/colors";
import AppButton from "../AppButton";
import AppInput from "../AppInput";

class SearchForm extends Component {
  styles = {
    clearAndInputContainer: {
      display: `flex`,
      flexWrap: `wrap-reverse`,
      justifyContent: `center`,
    },
    formElementContainer: {
      alignItems: `center`,
      display: `flex`,
      justifyContent: `center`,
      margin: `5px`,
    },
    searchFormContainer: {
      display: `flex`,
      flexWrap: `wrap`,
      justifyContent: `center`,
      marginBottom: `20px`,
    },
  };

  render() {
    return (
      <div style={this.styles.searchFormContainer}>
        <div style={this.styles.clearAndInputContainer}>
          <div style={this.styles.formElementContainer}>
            <AppButton
              id={`search-form-clear-button`}
              margin={`0px`}
              onClick={this.props.clearForm}
            >
              Clear
            </AppButton>
          </div>
          <div style={this.styles.formElementContainer}>
            <AppInput
              backgroundColor={colors.extraLightPrimary}
              fieldName={this.props.fieldName}
              handleChange={this.props.handleChange}
              handleSubmit={this.props.handleSubmit}
              id={this.props.id}
            />
          </div>
        </div>
        <div style={this.styles.formElementContainer}>
          <AppButton
            id={`search-form-search-button`}
            margin={`0px`}
            onClick={this.props.handleSubmit}
          >
            Search
          </AppButton>
        </div>
      </div>
    );
  }
}

export default SearchForm;
