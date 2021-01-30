"use strict";

const express = require(`express`);
const router = express.Router();

const characterController = require(`../../controllers/characterController`);

router.route(`/`).get(characterController.randomCharacter);
router.route(`/:id`).get(characterController.getCharacter);
router.route(`/findbyname`).post(characterController.findCharacterByName);
router.route(`/searchcharacter`).post(characterController.searchByInheritedId);

module.exports = router;
