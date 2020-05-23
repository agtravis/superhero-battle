"use strict";

const Character = require(`../database/models/Character`);
const mongoose = require(`mongoose`);

const errorResponseCode = 422;

module.exports = {
  randomCharacter: (req, res) => {
    const query = { state: `OK` };
    const totalCharacters = 731;
    const randomNum = Math.floor(Math.random() * totalCharacters);
    Character.find()
      .limit(1)
      .skip(randomNum)
      .then(dbCharacter => res.json(dbCharacter))
      .catch(err => console.error(err));
  },
};
