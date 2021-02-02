"use strict";

const router = require(`express`).Router();
const userLogin = require(`./user`);
const character = require(`./character.js`);

router.use(`/user`, userLogin);
router.use(`/character`, character);

module.exports = router;
