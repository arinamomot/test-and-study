const { Schema, model } = require("mongoose");

const ResponseSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  test: { type: Schema.Types.ObjectId, ref: "Test" },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  time: { type: Number }, //the time for which the test was completed
  creationDate: { type: Date, required: true, default: Date.now },
  maxPoints: { type: Number },
  userPoints: { type: Number },
  answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
  evaluation: { type: Boolean, default: false },
});

module.exports = model("Response", ResponseSchema);
