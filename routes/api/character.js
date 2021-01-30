"use strict";

const express = require(`express`);
const router = express.Router();
const User = require(`../../database/models/User`);
const passport = require(`../../passport`);

const characterController = require(`../../controllers/characterController`);

router.route(`/`).get(characterController.randomCharacter);
router.route(`/:id`).get(characterController.getCharacter);
router.route(`/findbyname`).post(characterController.findCharacterByName);
router.route(`/searchcharacter`).post(characterController.searchByInheritedId);

module.exports = router;
