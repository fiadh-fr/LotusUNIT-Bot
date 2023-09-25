const { Schema, model } = require("mongoose");

const modUnitSchema = new Schema({
    userId: {
    type: String,
    match: /^\d{17,19}$/,
    index: true,
  },
  pending: Boolean,
});

module.exports = model("modUnit", modUnitSchema);
