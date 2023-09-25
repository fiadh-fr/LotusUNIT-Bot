const { Schema, model } = require("mongoose");

const designerUnitSchema = new Schema({
    userId: {
    type: String,
    match: /^\d{17,19}$/,
    index: true,
  },
  pending: Boolean,
});

module.exports = model("designerUnit", designerUnitSchema);
