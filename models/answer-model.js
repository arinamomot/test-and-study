const { Schema, model } = require("mongoose");

const AnswerSchema = new Schema({
  question: { type: Schema.Types.ObjectId, ref: "Question" },
  userAnswers: [{ type: String }],
  isCorrect: { type: Boolean },
  userPoints: { type: Number },
  questionPoints: { type: Number },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  test: { type: Schema.Types.ObjectId, ref: "Test" },
  creationDate: { type: Date, required: true, default: Date.now },
  correctAnswers: [{ type: String }],
  required: { type: Boolean },
  answerFeedback: { type: String },
});

module.exports = model("Answer", AnswerSchema);
