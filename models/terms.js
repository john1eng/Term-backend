const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const termSchema = new Schema({
  term: { type: String },
  definition: { type: String },
  examples: { type: String },
  sources: { type: String },
});

termSchema.index({term: 'text', definition: 'text', sources: 'text'})
module.exports = mongoose.model("Term", termSchema);
