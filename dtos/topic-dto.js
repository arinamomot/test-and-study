module.exports = class TopicDto {
  id;
  title;
  subTopic;

  constructor(model) {
    this.id = model._id;
    this.title = model.title;
    this.subTopic = model.subTopic;
  }
};
