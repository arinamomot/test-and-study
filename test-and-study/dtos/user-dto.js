module.exports = class UserDto {
  email;
  id;
  firstName;
  lastName;
  roles;
  avatar;
  createdTests;
  sharedTest;

  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.firstName = model.firstName;
    this.lastName = model.lastName;
    this.roles = model.roles;
    this.avatar = model.avatar;
    this.createdTests = model.createdTests;
    this.sharedTest = model.sharedTest;
  }
};
