const { Schema, model } = require("mongoose");

const AttachmentSchema = new Schema({
  title: { type: String, default: "attachment" },
  // path: { type: String, default: "" },
  // photo: { type: String },
  img: { type: String },
  uploadDate: { type: Date, default: Date.now() },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  test: { type: Schema.Types.ObjectId, ref: "Test" },
  question: { type: Schema.Types.ObjectId, ref: "Question" },
});

module.exports = model("Attachment", AttachmentSchema);
