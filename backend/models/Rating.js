const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    score: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    feedback: {
      type: String,
      default: "",
      maxlength: 500,
      trim: true,
    },
    userName: {
      type: String,
      default: "",
      maxlength: 60,
      trim: true,
    },
    userRole: {
      type: String,
      default: "",
      enum: ["", "donor", "recipient", "hospital", "admin"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rating", ratingSchema);
