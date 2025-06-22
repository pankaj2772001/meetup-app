const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  eventType: {
    type: String,
    enum: ["Online", "Offline"],
    required: true,
  },

  eventTags: [
    {
      type: String,
        required: true,
      enum: [
        "networking",
        "business",
        "startups",
        "career",
        "freelancing",
        "mentorship",
        "marketing",
        "technology",
        "programming",
        "web3",
        "AI",
        "blockchain",
        "design",
        "education",
        "workshop",
        "bootcamp",
        "health",
        "fitness",
        "yoga",
        "meditation",
        "mental-health",
        "wellness",
        "food",
        "drinks",
        "coffee",
        "brunch",
        "nightlife",
        "dating",
        "social",
        "music",
        "art",
        "film",
        "photography",
        "comedy",
        "theater",
        "gaming",
        "board-games",
        "anime",
        "books",
        "writing",
        "crafts",
        "culture",
        "language-exchange",
        "travel",
        "environment",
        "volunteering",
        "spirituality",
        "activism",
        "family",
        "parenting",
        "pets",
        "community",
        "local-events",
        "holiday",
      ],
    },
  ],

  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    default: 0,
  },

  location: {

    type: String,
    required: true,
  },

  startDateAndTime: {

    type: String,
    required: true
  },

  endDateAndTime: {

    type: String, 
  },

  eventHosted: {
    type: String,
    required: true
  },

  dresscode: {

    type: String,
    default: "Casual",
    required: true

  },

  ageRestriction: {

    type: String,
    default: "None",
    required: true

  },

  eventImageUrl: {

    type: String,
    required: true
  },

  speaker: [{type: mongoose.Schema.Types.ObjectId, ref: "Speaker"}]
}, {timestamps: true});

const Event = mongoose.model('Event', EventSchema)

module.exports = Event


