"use strict";

const express = require(`express`);
const passport = require(`../../passport`);
const router = express.Router();
const userController = require(`../../controllers/usersController`);

router
  .route(`/`)
  .post(userController.newUser)
  .get(userController.userInSession);
router
  .route(`/:id`)
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);
router.route(`/all`).get(userController.findAll);
router.route(`/changepassword`).post(userController.changePassword);
router.route(`/checkpassword`).post(userController.checkPassword);
router.route(`/findone`).post(userController.search);
router.route(`/login`).post(
  (req, res, next) => {
    console.log(`routes/user.js, login, req.body: `);
    console.log(req.body);
    next();
  },
  passport.authenticate(`local`),
  userController.login
);
router.route(`/logbattle/:id`).put(userController.logBattle);
router.route(`/logout`).post(userController.logout);
router.route(`/lose/:id`).put(userController.lose);
router.route(`/makecaptain/:id`).put(userController.makeCaptain);
router.route(`/prestige/:id`).put(userController.prestige);
router.route(`/roster/add/:id`).put(userController.addCharacter);
router.route(`/roster/addmany/:id`).put(userController.addManyCharacters);
router.route(`/roster/remove/:id`).put(userController.removeCharacter);
router.route(`/roster/removemany/:id`).put(userController.removeManyCharacters);
router.route(`/search`).post(userController.search);
router.route(`/team/add/:id`).put(userController.addToTeam);
router.route(`/team/addmany/:id`).put(userController.addManyCharactersToTeam);
router.route(`/team/empty/:id`).put(userController.emptyTeam);
router.route(`/team/remove/:id`).put(userController.removeFromTeam);
router.route(`/topscorers`).get(userController.getTopScorers);
router
  .route(`/topscorersbypropertyname`)
  .post(userController.getTopScorerByPropertyName);
router.route(`/win/:id`).put(userController.win);

module.exports = router;
