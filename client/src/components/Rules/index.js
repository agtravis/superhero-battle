import React, { Component } from "react";

class Rules extends Component {
  render() {
    return (
      <div>
        <p>Rules:</p>
        <ul>
          <li>
            Start by drafting your captain. This is a randomly assigned
            character gifted to you. Your captain is always the longest
            surviving member of your team, and has no advantages over any other
            character.
          </li>
          <li>
            Once you have one member of your team, you are ready to fight! You
            can enter a solo battle for a one-on-one battle. You will first be
            shown the opposing character with whom you are about to battle. Next
            you can choose one of your recruits to be the rival. Now you are
            ready to fight!
          </li>
          <li>
            You strike first! Choose your best attribute with which to attack!
          </li>
          <li>
            Next, defense! Your opponent will choose their best ability with
            which to strike back!
          </li>
          <li>
            If the battle is tied after two rounds, a third round with a
            randomly selected attribute will take place to decide the victor!
          </li>
          <li>
            An algorithm decides who wins each round, and the same algorithm is
            applied evenly to both contenders. However the algorithm is based on
            the value of the attribute, so while there is an element of chance,
            you should still be strategic!
          </li>
          <li>
            If you are defeated, your team member will leave your team, however
            if you win, your opponent will be recruited into your team, and you
            will be able to use that character in your next battle!
          </li>
          <li>
            The game is over when you collect all 731 characters in the
            multiverse!
          </li>
          <li>
            Team games work the same as solo battles, but the attributes are
            compounded. If you win, all 3 members of the opposing team join your
            side! Careful though, if you lose, you will lose all 3 competing
            members of your team!
          </li>
          <li>
            Some characters are mysterious. If any attributes are unknown, when
            drawn into battle they will be wildcards!
          </li>
        </ul>
      </div>
    );
  }
}

export default Rules;