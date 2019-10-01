const Helper = require("../helper/Rockets");

class RocketsController {
  static async apiGetRockets(req, res) {
    try {
      const filter = req.query;
      const sort = { flight_number: 1 };
      const response = await Helper.getRockets(filter, sort);
      res.json(response);
    } catch (err) {
      res.status(500).send({ message: "Something went wrong" });
    }
  }
}

module.exports = RocketsController;
