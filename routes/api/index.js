"use strict";

const router = require(`express`).Router();
const userLogin = require(`./user`);
const character = require(`./character.js`);

router.use(`/character`, character);
router.use(`/user`, userLogin);

module.exports = router;
