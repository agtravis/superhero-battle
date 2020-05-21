"use strict";

const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;
const bcrypt = require(`bcryptjs`);
mongoose.promise = Promise;

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, default: `` },
  location: { type: String, default: `` },
  roster: [
    {
      type: Schema.Types.ObjectId,
      ref: `Character`,
    },
  ],
  status: { type: String, default: `` },
  registered: { type: Date, default: Date.now },
  teams: [
    {
      type: Schema.Types.ObjectId,
      ref: `Team`,
    },
  ],
});

userSchema.methods = {
  checkPassword: function (inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword: plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, 10);
  },
};

// Define hooks for pre-saving
userSchema.pre(`save`, function (next) {
  if (!this.password) {
    console.log(`models/user.js =======NO PASSWORD PROVIDED=======`);
    next();
  } else {
    console.log(`models/user.js hashPassword in pre save`);

    this.password = this.hashPassword(this.password);
    next();
  }
});

const User = mongoose.model(`User`, userSchema);
module.exports = User;
