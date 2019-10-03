const mongoose = require("mongoose");

const RocketSchema = new mongoose.Schema(
  {
    flight_number: Number,
    launch_date_unix: Number,
    rocket: {
      rocket_id: String,
      rocket_name: String,
      rocket_type: String,
      first_stage: {
        cores: [
          {
            reused: Boolean,
            land_success: Boolean
          }
        ]
      },
      second_stage: {
        payloads: [{ reused: Boolean }]
      }
    },
    links: {
      mission_patch: String,
      mission_patch_small: String,
      reddit_campaign: String,
      reddit_launch: String,
      reddit_recovery: String,
      reddit_media: String,
      article_link: String
    },
    details: String
  },
  { collection: "rockets" }
);

module.exports = Rocket = mongoose.model("rocket", RocketSchema);
