const { Schema, model } = require("mongoose");

const UserRoleSchema = new Schema({
  role: { type: String, unique: true, default: "USER" },
});

module.exports = model("UserRole", UserRoleSchema);
