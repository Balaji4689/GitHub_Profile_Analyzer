const GithubProfile = require("../models/GithubProfile");


// Analyze GitHub Profile
exports.analyzeProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const response = await fetch(
      `https://api.github.com/users/${username}`
    );

    if (!response.ok) {
      return res.status(404).json({
        success: false,
        message: "GitHub user not found",
      });
    }

    const user = await response.json();

    let profile = await GithubProfile.findOne({
      username: user.login,
    });

    if (!profile) {
      profile = await GithubProfile.create({
        username: user.login,
        name: user.name,
        followers: user.followers,
        following: user.following,
        publicRepos: user.public_repos,
        profileUrl: user.html_url,
        avatarUrl: user.avatar_url,
        accountCreated: user.created_at,
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile analyzed successfully",
      data: profile,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


// Get All Stored Profiles
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await GithubProfile.find();

    res.status(200).json({
      success: true,
      count: profiles.length,
      data: profiles,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


// Get Single Profile By Username
exports.getSingleProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const profile = await GithubProfile.findOne({
      username,
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};