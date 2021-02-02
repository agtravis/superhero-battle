"use strict";

const router = require(`express`).Router();
const passport = require(`../../passport`);
const userController = require(`../../controllers/usersController`);
const roster = require(`./roster`);
const team = require(`./team`);

router.use(`/roster`, roster);
router.use(`/team`, team);

router
  .route(`/`)
  .post(userController.newUser)
  .get(userController.userInSession);
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
router.route(`/search`).post(userController.search);
router.route(`/topscorers`).get(userController.getTopScorers);
router
  .route(`/topscorersbypropertyname`)
  .post(userController.getTopScorerByPropertyName);
router.route(`/win/:id`).put(userController.win);
router
  .route(`/:id`)
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

module.exports = router;
