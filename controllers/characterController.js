"use strict";

const Character = require(`../database/models/Character`);

const errorResponseCode = 422;

module.exports = {
  findCharacterByName: (req, res) => {
    Character.find({
      name: {
        $regex: req.body.name,
        $options: `i`,
      },
    })
      .then(dbCharacter => res.json(dbCharacter))
      .catch(err => res.status(errorResponseCode).json(err));
  },
  getCharacter: (req, res) => {
    Character.findById(req.params.id)
      .then(dbCharacter => res.json(dbCharacter))
      .catch(err => res.status(errorResponseCode).json(err));
  },
  randomCharacter: (req, res) => {
    const totalCharacters = 731;
    const randomNum = Math.floor(Math.random() * totalCharacters);
    Character.find()
      .limit(1)
      .skip(randomNum)
      .then(dbCharacter => res.json(dbCharacter))
      .catch(err => res.status(errorResponseCode).json(err));
  },
  searchByInheritedId: (req, res) => {
    Character.find({
      id: req.body.id,
    })
      .then(dbCharacters => res.json(dbCharacters))
      .catch(err => res.status(errorResponseCode).json(err));
  },
};
