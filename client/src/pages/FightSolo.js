import React, { Component } from "react";

class SoloFight extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    if (!this.props.currentUser) {
      window.location.href = `/`;
    }
    return (
      <div>
        <p>SoloFight</p>
        <div>
          {/* multiple columns in this div, 
          
          
          1. choose your enemy - random selection, needs to not be contained in your selection
          get list from roster loaded into hashmap based on id
          get list from array in js file, filter based on if the hashmap doesn't exist, only new items come into this new array
          pick random from array
          use name to run a query on the database to get id of that character
          load character into the selection div - don't show stats

          2. choose your fighter from scrollable div, with stats. Click on selection, presents modal, confirm or exit. Once confirmed, fighter replaces selection
          
          3. this is just a button that says fight, appears when both other divs have been selected, opens modal for fight to take place in
*/}
          {/* In the fight, user chooses first category, computer chooses second (highest), third is random. best of 3. 
          each character multiply stat by different random number, compare two results, highest wins
          win = collect your opponent
          lose = lose your fighter
          if all categories are null , random number will be chosen
          If a category is null, stat is randomly assigned.
*/}
        </div>
      </div>
    );
  }
}

export default SoloFight;
