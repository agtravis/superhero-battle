/* eslint-disable arrow-parens */
"use strict";

// IS THIS FILE DOING ANYTHING? DOESN'T CONNECT TO
// process.env.MONGO_CONNECTION
// can't find any imports

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
      console.log(`Connected to Mongo`);
    },
    err => {
      console.log(`error connecting to Mongo: `);
      console.log(err);
    }
  );

module.exports = mongoose.connection;
