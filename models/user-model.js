const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  roles: [{ type: String, ref: "UserRole" }],
  avatar: { type: Schema.Types.ObjectId, ref: "Attachment" },
  createdTests: [{ type: Schema.Types.ObjectId, ref: "Test" }],
  sharedTest: [{ type: Schema.Types.ObjectId, ref: "Test" }],
});

module.exports = model("User", UserSchema);
