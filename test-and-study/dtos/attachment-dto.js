module.exports = class AttachmentDto {
  id;
  title;
  img;
  uploadDate;
  user;
  test;
  question;

  constructor(model) {
    this.id = model._id;
    this.title = model.title;
    this.img = model.img;
    this.uploadDate = model.uploadDate;
    this.user = model.user;
    this.test = model.test;
    this.question = model.question;
  }
};
