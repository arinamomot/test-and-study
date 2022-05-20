const { Schema, model } = require("mongoose");

const QuestionSchema = new Schema({
  test: { type: Schema.Types.ObjectId, ref: "Test" },
  questionText: { type: String },
  questionType: { type: String, ref: "QuestionType" },
  note: { type: String },
  options: [{ type: String }],
  points: { type: Number },
  topic: { type: String },
  correctAnswer: [{ type: String }],
  required: { type: Boolean },
  answerFeedback: { type: String },
});

module.exports = model("Question", QuestionSchema);
