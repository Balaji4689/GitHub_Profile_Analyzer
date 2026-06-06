const mongoose = require("mongoose");

const githubProfileSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: String,
    followers: Number,
    following: Number,
    publicRepos: Number,
    profileUrl: String,
    avatarUrl: String,
    accountCreated: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "GithubProfile",
  githubProfileSchema
);