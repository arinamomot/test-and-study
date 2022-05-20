module.exports = class TestDto {
  _id;
  title;
  description;
  testType;
  creator;
  creationDate;
  questions;
  members;
  color;
  time;
  evaluation;
  image;

  constructor(model) {
    this._id = model._id;
    this.title = model.title;
    this.description = model.description;
    this.testType = model.testType;
    this.creator = model.creator;
    this.creationDate = model.creationDate;
    this.questions = model.questions;
    this.topic = model.topic;
    this.members = model.members;
    this.color = model.color;
    this.time = model.time;
    this.evaluation = model.evaluation;
    this.image = model.image;
  }
};
