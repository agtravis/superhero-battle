"use strict";

const User = require(`../database/models/User`);
const mongoose = require(`mongoose`);

const errorResponseCode = 422;

module.exports = {
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
  login: (req, res) => {
    console.log(`logged in`, req.user);
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
  findById: (req, res) => {
    User.findById(req.params.id)
      .populate(`roster`)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(errorResponseCode).json(err));
  },
  update: (req, res) => {
    User.updateOne({ _id: mongoose.Types.ObjectId(req.params.id) }, req.body, {
      useFindAndModify: false,
    })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(errorResponseCode).json(err));
  },
  remove: (req, res) => {
    User.findById({ _id: req.params.id })
      .then(dbUser => dbUser.remove())
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(errorResponseCode).json(err));
  },
  findAll: (req, res) => {
    User.find(req.query)
      .then(dbUsers => res.json(dbUsers))
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
      .catch(err => res.json(err));
  },
  addCharacter: (req, res) => {
    User.updateOne(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      {
        $push: { roster: req.body.characterId },
      }
    )
      .then(dbUser => res.json(dbUser))
      .catch(err => res.json(err));
  },
  addManyCharacters: (req, res) => {
    User.updateOne(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      { $push: { roster: { $each: req.body.ids } } }
    )
      .then(dbUser => res.json(dbUser))
      .catch(err => res.json(err));
  },
  removeCharacter: (req, res) => {
    User.updateOne(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      {
        $pull: { roster: req.body.characterId },
      }
    )
      .then(dbUser => res.json(dbUser))
      .catch(err => res.json(err));
  },
  removeManyCharacters: (req, res) => {
    User.updateOne(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      { $pullAll: { roster: req.body.ids } }
    )
      .then(dbUser => res.json(dbUser))
      .catch(err => res.json(err));
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
      .catch(err => res.json(err));
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
      .catch(err => res.json(err));
  },
  tie: (req, res) => {
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
      .catch(err => res.json(err));
  },
  logBattle: (req, res) => {
    User.updateOne(
      { _id: mongoose.Types.ObjectId(req.params.id) },
      { $push: { pastBattles: req.body.battle } }
    )
      .then(dbUser => res.json(dbUser))
      .catch(err => res.json(err));
  },
};

// router.put(`/post/:id`, (req, res) => {
//   User.updateOne(
//     { _id: mongoose.Types.ObjectId(req.params.id) },
//     {
//       $push: { posts: req.body.id },
//     }
//   )
//     .populate(`posts`)
//     .then(dbUser => res.json(dbUser))
//     .catch(err => res.json(err));
// });

// create: (req, res) => {
//   db.User.create(req.body)
//     .then(dbModel => res.json(dbModel))
//     .catch(err => res.status(errorResponseCode).json(err));
// },
// updateNewPost: (req, res) => {
//   db.User.updateOne(
//     { _id: mongoose.Types.ObjectId(req.params.id) },
//     {
//       $push: { posts: req.body.id },
//     }
//   )
//     .populate(`posts`)
//     .then(dbModel => res.json(dbModel))
//     .catch(err => res.status(errorResponseCode).json(err));
// },
// removePostFromUser: (req, res) => {
//   db.User.updateOne(
//     { _id: mongoose.Types.ObjectId(req.params.id) },
//     {
//       $pull: { posts: mongoose.Types.ObjectId(req.body.id) },
//     }
//   )
//     .populate(`posts`)
//     .then(dbModel => res.json(dbModel))
//     .catch(err => res.status(errorResponseCode).json(err));
// },
