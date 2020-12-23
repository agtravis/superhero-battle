"use strict";

const mongoose = require(`mongoose`);
mongoose.Promise = global.Promise;

// 27017 is the default mongoDB port
// const uri = `mongodb://localhost:27017/superherobattle`;
const uri = `mongodb://localhost/superherobattle`;

mongoose
  .connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(
    () => {
      console.log(`Connected to Mongo 1234567890`);
    },
    err => {
      console.log(`error connecting to Mongo: `);
      console.log(err);
    }
  );

module.exports = mongoose.connection;
