const mongoose = require("mongoose");

const blocklisttokenschema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "token is required to be added in blacklist"],
    },
  },
  {
    timestamps: true,
  },
);

const tokenblacklistmodel = mongoose.model(
  "blacklisttoken",
  blocklisttokenschema,
);

module.exports = tokenblacklistmodel;
