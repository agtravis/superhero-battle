"use strict";

const router = require(`express`).Router();
const userController = require(`../../controllers/usersController`);

router.route(`/add/:id`).put(userController.addCharacter);
router.route(`/addmany/:id`).put(userController.addManyCharacters);
router.route(`/remove/:id`).put(userController.removeCharacter);
router.route(`/removemany/:id`).put(userController.removeManyCharacters);

module.exports = router;
