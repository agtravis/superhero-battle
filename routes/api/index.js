"use strict";

const router = require(`express`).Router();
const userLogin = require(`./user`);
const character = require(`./character.js`);
const User = require(`../../database/models/User`);

router.use(`/user`, userLogin);
router.use(`/character`, character);

module.exports = router;

// returns a list of all users
// api/users
// router.get(`/users`, (req, res) => {
//   User.find({})
//     .sort({ date: -1 })
//     .then(dbUsers => {
//       console.log(dbUsers);
//       res.json(dbUsers);
//     })
//     .catch(err => res.json(err));
// });

// same as above but populates posts array
// api/usersposts
// router.get(`/usersposts`, (req, res) => {
//   User.find({})
//     .populate(`posts`)
//     .sort({ date: -1 })
//     .then(dbUsers => {
//       console.log(dbUsers);
//       res.json(dbUsers);
//     })
//     .catch(err => res.json(err));
// });

// returns a list of all users
// api/users
// router.get(`/users`, (req, res) => {
//   User.find({})
//     .sort({ date: -1 })
//     .then(dbUsers => {
//       console.log(dbUsers);
//       res.json(dbUsers);
//     })
//     .catch(err => res.json(err));
// });

// same as above but populates posts array
// api/usersposts
// router.get(`/usersposts`, (req, res) => {
//   User.find({})
//     .populate(`posts`)
//     .sort({ date: -1 })
//     .then(dbUsers => {
//       console.log(dbUsers);
//       res.json(dbUsers);
//     })
//     .catch(err => res.json(err));
// });

// searches for a partial string in a username, returns any that match as an object req.body === { search: [string] }
// api/users/user
// router.post(`/users/user`, (req, res) => {
//   console.log(`back end req.body`);
//   console.log(req.body);
//   User.find({
//     username: {
//       $regex: req.body.search,
//       $options: `i`,
//     },
//   })
//     .populate(`posts`)
//     .then(dbUser => res.json(dbUser))
//     .catch(err => res.json(err));
// });
