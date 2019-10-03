const Rocket = require("../../models/Rockets");
const generateFilter = require("./generate-filter");

class Helper {
  static async getRockets(filter, sort) {
    const filterQuery = generateFilter(filter);
    try {
      const data = await Rocket.aggregate(filterQuery).sort(sort);
      return data;
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
    }
  }
}

module.exports = Helper;
