"use strict";

const User = require(`../database/models/User`);
const mongoose = require(`mongoose`);
const bcrypt = require(`bcryptjs`);

const errorResponseCode = 422;

module.exports = {
  addCharacter: (req, res) => {
    User.updateOne(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      {
        $push: { roster: req.body.characterId },
      }
    )
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(errorResponseCode).json(err));
  },
  addManyCharacters: (req, res) => {
    User.updateOne(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      { $push: { roster: { $each: req.body.ids } } }
    )
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(errorResponseCode).json(err));
  },
  addManyCharactersToTeam: (req, res) => {
    User.updateOne(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      { $push: { teams: { $each: req.body.characters } } }
    )
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(errorResponseCode).json(err));
  },
  addToTeam: (req, res) => {
    User.updateOne(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      { $push: { teams: req.body.characterId } }
    )
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(errorResponseCode).json(err));
  },
  changePassword: (req, res) => {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(req.body.password, salt, function (err, hash) {
        User.updateOne(
          { _id: mongoose.Types.ObjectId(req.body.id) },
          {
            $set: {
              password: hash,
            },
          }
        )
          .then(dbUser => res.json(dbUser))
          .catch(err => res.status(errorResponseCode).json(err));
      });
    });
  },
  checkPassword: (req, res) => {
    User.findById(req.body.userId)
      .then(dbUser => {
        bcrypt.compare(req.body.old, dbUser.password, (err, response) => {
          if (err) {
            res.send(err);
          } else {
            res.send(response);
          }
        });
      })
      .catch(err => res.status(errorResponseCode).json(err));
  },
  emptyTeam: (req, res) => {
    User.updateOne(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      { $set: { teams: [] } }
    )
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(errorResponseCode).json(err));
  },
  findAll: (req, res) => {
    User.find(req.query)
      .then(dbUsers => res.json(dbUsers))
      .catch(err => res.status(errorResponseCode).json(err));
  },
  findById: (req, res) => {
    User.findById(req.params.id)
      .populate(`roster`)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(errorResponseCode).json(err));
  },
  getTopScorers: (req, res) => {
    User.find(req.query)
      .sort([
        [`prestige`, `desc`],
        [`wins`, `desc`],
        [`losses`, `asc`],
      ])
      .limit(10)
      .then(dbUsers => res.json(dbUsers))
      .catch(err => res.status(errorResponseCode).json(err));
  },
  getTopScorerByPropertyName: (req, res) => {
    User.find()
      .sort([[req.body.property, req.body.direction]])
      .limit(10)
      .then(dbUsers => res.json(dbUsers))
      .catch(err => res.status(errorResponseCode).json(err));
  },
  logBattle: (req, res) => {
    User.updateOne(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      { $push: { pastBattles: req.body.battle } }
    )
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(errorResponseCode).json(err));
  },
  login: (req, res) => {
    console.log(`logged in`, req.user._id, req.user.username);
    const userInfo = {
      username: req.user.username,
      id: req.user._id,
    };
    res.send(userInfo);
  },
  logout: (req, res) => {
    if (req.user) {
      req.logout();
      res.send({ msg: `Logging out` });
    } else {
      res.send({ msg: `No user to log out` });
    }
  },
  lose: (req, res) => {
    User.updateOne(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      {
        $inc: {
          fights: 1,
          losses: 1,
        },
      }
    )
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(errorResponseCode).json(err));
  },
  makeCaptain: (req, res) => {
    User.updateOne(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      {
        $pull: { roster: req.body.characterId },
      }
    )
      .then(() => {
        User.updateOne(
          { _id: mongoose.Types.ObjectId(req.params.id) },
          {
            $push: { roster: { $each: [req.body.characterId], $position: 0 } },
          }
        )
          .then(dbUser => res.json(dbUser))
          .catch(err => res.status(errorResponseCode).json(err));
      })
      .catch(err => res.status(errorResponseCode).json(err));
  },
  newUser: (req, res) => {
    console.log(`user signup`);
    const { username, password } = req.body;
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        console.error(`User.js POST error: `, err);
      } else if (user) {
        res.json({
          error: `Sorry, already a user with the username: ${username}`,
        });
      } else {
        const newUser = new User({
          username: username,
          password: password,
        });
        newUser.save((err, savedUser) => {
          if (err) return res.json(err);
          res.json(savedUser);
        });
      }
    });
  },
  prestige: (req, res) => {
    User.updateOne(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      {
        $set: {
          roster: [],
        },
        $inc: {
          prestige: 1,
        },
      }
    )
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(errorResponseCode).json(err));
  },
  remove: (req, res) => {
    User.findById({ _id: req.params.id })
      .then(dbUser => dbUser.remove())
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(errorResponseCode).json(err));
  },
  removeCharacter: (req, res) => {
    User.updateOne(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      {
        $pull: { roster: req.body.characterId },
      }
    )
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(errorResponseCode).json(err));
  },
  removeFromTeam: (req, res) => {
    User.updateOne(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      {
        $pull: { teams: { _id: req.body.characterId } },
      }
    )
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(errorResponseCode).json(err));
  },
  removeManyCharacters: (req, res) => {
    User.updateOne(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      { $pullAll: { roster: req.body.ids, teams: req.body.ids } }
    )
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(errorResponseCode).json(err));
  },
  search: (req, res) => {
    User.find({
      username: {
        $regex: req.body.search,
        $options: `i`,
      },
    })
      .then(dbUsers => res.json(dbUsers))
      .catch(err => res.status(errorResponseCode).json(err));
  },
  update: (req, res) => {
    User.updateOne({ _id: mongoose.Types.ObjectId(req.params.id) }, req.body, {
      useFindAndModify: false,
    })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(errorResponseCode).json(err));
  },
  userInSession: (req, res) => {
    console.log(`===== user!!======`);
    if (req.user) {
      console.log(req.user);
      res.json({ user: req.user });
    } else {
      console.log(`No user`);
      res.json({ user: null });
    }
  },
  win: (req, res) => {
    User.updateOne(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      {
        $inc: {
          fights: 1,
          wins: 1,
        },
      }
    )
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(errorResponseCode).json(err));
  },
};
