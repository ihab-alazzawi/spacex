const express = require("express");
const router = express.Router();
const Rocket = require("../../models/Rockets");

router.get("/", async (req, res) => {
  try {
    const rockets = await Rocket.find().sort({ flight_number: 1 });
    res.json(rockets);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;
