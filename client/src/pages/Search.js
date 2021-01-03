import React, { Component } from "react";
import SearchForm from "../components/SearchForm";
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

  styles = {
    container: {
      alignItems: `center`,
      display: `flex`,
      height: `100px`,
      justifyContent: `center`,
      margin: `auto`,
      width: `75%`,
    },
    subContainer: {
      alignItems: `space-around`,
      display: `flex`,
      justifyContent: `center`,
      width: `200px`,
    },
    text: {
      fontSize: `1.5rem`,
      margin: `0px`,
    },
  };

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
    if (this.state.isUserSearch) {
      document
        .getElementById(`user-search-text`)
        .classList.remove(`fight-mode-bolder`);
      document
        .getElementById(`character-search-text`)
        .classList.add(`fight-mode-bolder`);
    } else {
      document
        .getElementById(`user-search-text`)
        .classList.add(`fight-mode-bolder`);
      document
        .getElementById(`character-search-text`)
        .classList.remove(`fight-mode-bolder`);
    }
    this.setState({ isUserSearch: !this.state.isUserSearch });
  };

  render() {
    if (!this.props.currentUser) {
      window.location.href = `/`;
    }
    return (
      <div>
        <div style={this.styles.container}>
          <div style={this.styles.subContainer}>
            <p
              className={`fight-mode-bolder`}
              id={`user-search-text`}
              style={this.styles.text}
            >
              USER
            </p>
          </div>
          <div style={{ ...this.styles.subContainer, paddingTop: `9px` }}>
            <label className="switch">
              <input onChange={() => this.toggleSearchMode()} type="checkbox" />
              <span className="slider"></span>
            </label>
          </div>
          <div style={this.styles.subContainer}>
            <p id={`character-search-text`} style={this.styles.text}>
              HERO
            </p>
          </div>
        </div>
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
