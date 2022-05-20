module.exports = class ResponseDto {
  id;
  user;
  test;
  questions;
  time;
  creationDate;
  maxPoints;
  userPoints;
  answers;
  evaluation;

  constructor(model) {
    this.id = model._id;
    this.user = model.user;
    this.test = model.test;
    this.questions = model.questions;
    this.time = model.time;
    this.creationDate = model.creationDate;
    this.maxPoints = model.maxPoints;
    this.userPoints = model.userPoints;
    this.answers = model.answers;
    this.evaluation = model.evaluation;
  }
};
