module.exports = class QuestionDto {
  id;
  questionText;
  questionType;
  note;
  options;
  points;
  topic;
  correctAnswer;
  required;
  answerFeedback;

  constructor(model) {
    this.id = model._id;
    this.questionText = model.questionText;
    this.questionType = model.questionType;
    this.note = model.note;
    this.options = model.options;
    this.points = model.points;
    this.topic = model.topic;
    this.correctAnswer = model.correctAnswer;
    this.required = model.required;
    this.answerFeedback = model.answerFeedback;
  }
};
