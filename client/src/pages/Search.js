import React, { Component } from "react";
import SearchForm from "../components/SearchForm";
import ToggleSwitch from "../components/ToggleSwitch";
import API from "../utils/API";
import SuperHeroAPI from "../utils/SuperHeroAPI";

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserSearch: true,
      searchField: ``,
      searched: false,
      results: [],
    };
  }

  clearForm = () => {
    document.getElementById(`user-search`).value = ``;
    this.setState({ searchField: `` });
  };

  handleChange = (event, stateKey) => {
    this.setState({ [stateKey]: event.target.value });
  };

  handleSubmit = () => {
    this.setState({ search: false });
    if (this.state.isUserSearch) {
      API.findOneUserByName({ search: this.state.searchField })
        .then(response => {
          this.setState({ results: response.data, searched: `user` });
        })
        .catch(err => console.error(err));
    } else {
      SuperHeroAPI.findCharacterByName(this.state.searchField)
        .then(response => {
          this.setState({ results: response.data, searched: `hero` });
        })
        .catch(err => console.error(err));
    }
  };

  toggleSearchMode = () => {
    this.clearForm();
    this.setState({ isUserSearch: !this.state.isUserSearch });
  };

  render() {
    if (!this.props.currentUser) {
      window.location.href = `/`;
    }
    return (
      <div>
        <ToggleSwitch
          leftText={`USER`}
          rightText={`HERO`}
          height={`100px`}
          toggleFunction={this.toggleSearchMode}
        />
        <SearchForm
          clearForm={this.clearForm}
          fieldName={`searchField`}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          id={`user-search`}
        />
        {this.state.searched === `user` &&
          this.state.results.map((user, index) => (
            <p key={index}>{user.username}</p>
          ))}
        {this.state.searched === `hero` &&
          this.state.results.map((hero, index) => (
            <p key={index}>{hero.name}</p>
          ))}
      </div>
    );
  }
}

export default SearchPage;
