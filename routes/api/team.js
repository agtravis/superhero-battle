"use strict";

const router = require(`express`).Router();
const userController = require(`../../controllers/usersController`);

router.route(`/add/:id`).put(userController.addToTeam);
router.route(`/addmany/:id`).put(userController.addManyCharactersToTeam);
router.route(`/empty/:id`).put(userController.emptyTeam);
router.route(`/remove/:id`).put(userController.removeFromTeam);

module.exports = router;
