const { Schema, model } = require("mongoose");

const TestSchema = new Schema({
  title: { type: String, required: true, default: "Untitled" },
  description: { type: String },
  testType: { type: String, ref: "TestType" },
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  creationDate: { type: Date, required: true, default: Date.now },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  topic: { type: Schema.Types.ObjectId, ref: "Topic" },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  time: { type: Number },
  color: { type: String },
  evaluation: { type: Boolean, default: false },
  image: { type: String },
});

module.exports = model("Test", TestSchema);
