const mongoose = require("mongoose");

const SpeakerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  designation: {
    type: String,

    enum: [
      "founder",
      "co-founder",
      "ceo",
      "cto",
      "developer",
      "designer",
      "product-manager",
      "marketing-expert",
      "data-scientist",
      "investor",
      "mentor",
      "coach",
      "professor",
      "researcher",
      "author",
      "influencer",
      "consultant",
      "trainer",
      "entrepreneur",
      "community-leader",
      "speaker",
      "panelist",
      "moderator",
    ],
  },

  profileImageUrl: {
    type: String
  }
});


const Speaker = mongoose.model('Speaker', SpeakerSchema)

module.exports = Speaker
