module.exports = class AnswerDto {
  id;
  question;
  userAnswers;
  isCorrect;
  userPoints;
  questionPoints;
  creationDate;
  user;
  test;
  correctAnswers;
  required;
  answerFeedback;

  constructor(model) {
    this.id = model._id;
    this.question = model.question;
    this.userAnswers = model.userAnswers;
    this.isCorrect = model.isCorrect;
    this.userPoints = model.userPoints;
    this.questionPoints = model.questionPoints;
    this.creationDate = model.creationDate;
    this.user = model.user;
    this.test = model.test;
    this.correctAnswers = model.correctAnswers;
    this.required = model.required;
    this.answerFeedback = model.answerFeedback;
  }
};
