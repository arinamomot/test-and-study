const { Schema, model } = require("mongoose");

const TestTypeSchema = new Schema({
  testType: { type: String, unique: true, required: true },
});

module.exports = model("TestType", TestTypeSchema);
