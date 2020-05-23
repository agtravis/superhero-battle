"use strict";

const mongoose = require(`mongoose`);
const Character = require(`../database/models/Character`);
const characters = require(`../characters`);

mongoose.connect(
  process.env.MONGODB_URI || `mongodb://localhost/superherobattle`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

Character.deleteMany({})
  .then(() => Character.collection.insertMany(characters))
  .then(data => {
    console.log(`${data.result.n} characters entered!`);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
