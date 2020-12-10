import React, { Component } from "react";
import Team from "../../Team";

class GetDefenderTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamSelected: false,
    };
  }
  render() {
    return (
      <div>
        <h4>Choose Your Team</h4>
        {!this.state.teamSelected && (
          <div>
            <div>
              <h5>Your current team:</h5>
              <div>
                {this.props.team.length > 0 ? (
                  <Team team={this.props.team} />
                ) : (
                  <div>
                    <p>nobody in team</p>
                    <p>
                      Add GetDefenderSolo Component here, adjust props. On
                      submit pushes to team.
                    </p>
                    <p>
                      if team has 1 member, button to get 2nd member hides all
                      other content using a state boolean and reveals back when
                      chosen
                    </p>
                    <p>
                      if team has 2 members, button to get 3rd member hides all
                      other content using a state boolean and reveals back when
                      chosen
                    </p>
                    <p>if team is full, button showing moves forward phase</p>
                    <p>
                      button above/below each member to remove that member from
                      team
                    </p>
                  </div>
                )}
                <div>
                  {/*this.props.team[0] ? (
                    <div>
                      <p>{this.props.team[0].name}</p>
                    </div>
                  ) : (
                    <div>
                      <p>no team member</p>
                    </div>
                  )}
                </div>
                <div>
                  {this.props.team[1] ? (
                    <div>
                      <p>{this.props.team[1].name}</p>
                    </div>
                  ) : (
                    <div>
                      <p>no team member</p>
                    </div>
                  )}
                </div>
                <div>
                  {this.props.team[2] ? (
                    <div>
                      <p>{this.props.team[2].name}</p>
                    </div>
                  ) : (
                    <div>
                      <p>no team member</p>
                    </div>
                  )*/}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default GetDefenderTeam;
