"use strict";

const express = require(`express`);
const router = express.Router();
const User = require(`../../database/models/User`);
const passport = require(`../../passport`);

const characterController = require(`../../controllers/characterController`);

router.route(`/`).get(characterController.randomCharacter);

module.exports = router;
