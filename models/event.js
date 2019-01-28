const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    // updatedAt: { type: Date },
    date: { type: String, required: true },
    title: { type: String, required: true },
    location: { type: String, required: true },
    // subreddit: { type: String, required: true }
});

EventSchema.pre("save", function(next) {
    // SET createdAt AND updatedAt
    const now = new Date();
    this.updatedAt = now;
  
    if (!this.createdAt) {
      this.createdAt = now;
    }
  
    next();
  });
  
  module.exports = mongoose.model("Event", EventSchema);
  