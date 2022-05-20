const { Schema, model } = require("mongoose");

const QuestionTypeSchema = new Schema({
  questionType: { type: String, unique: true, required: true },
});

module.exports = model("QuestionType", QuestionTypeSchema);
