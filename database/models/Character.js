"use strict";

const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const characterSchema = new Schema({
  response: { type: Schema.Types.Mixed },
  id: { type: Schema.Types.Mixed },
  name: { type: Schema.Types.Mixed },
  powerstats: { type: Schema.Types.Mixed },
  biography: { type: Schema.Types.Mixed },
  appearance: { type: Schema.Types.Mixed },
  work: { type: Schema.Types.Mixed },
  connections: { type: Schema.Types.Mixed },
  image: { type: Schema.Types.Mixed },
});

const Character = mongoose.model(`Character`, characterSchema);

module.exports = Character;
