const { Schema, model } = require("mongoose");

const TopicSchema = new Schema({
  title: { type: String, default: "topic" },
  subTopic: { type: String, default: "sub-topic" },
});

module.exports = model("Topic", TopicSchema);
