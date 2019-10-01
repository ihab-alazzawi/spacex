const db = require("../../config/db");
const Helper = require("../../routes/helper/Rockets");

describe("Rockets API", () => {
  beforeAll(async () => {
    await db.connectDB();
  });

  afterAll(async () => {
    await db.closeDB();
  });

  it("should returns all docs from rockets if filter false and sort by flight_number", async () => {
    const filter = {
      reused: "false",
      with_reddit: "false",
      land_success: "false"
    };
    const sort = { flight_number: 1 };
    const data = await Helper.getRockets(filter, sort);
    expect(data.length).toEqual(83);
    expect(data[0].flight_number).toEqual(1);
    expect(data[1].flight_number).toEqual(2);
    expect(data[2].flight_number).toEqual(3);
  });

  it("should returns only docs match reused filter", async () => {
    const filter = {
      reused: "true",
      with_reddit: "false",
      land_success: "false"
    };
    const sort = { flight_number: 1 };
    const data = await Helper.getRockets(filter, sort);
    expect(data.length).toEqual(25);
    expect(data[0].rocket.first_stage.cores[0].reused).toBe.true;
  });

  it("should returns only docs match with_reddit filter", async () => {
    const filter = {
      reused: "false",
      with_reddit: "true",
      land_success: "false"
    };
    const sort = { flight_number: 1 };
    const data = await Helper.getRockets(filter, sort);
    expect(data.length).toEqual(74);
    expect(data[0].links.reddit_launch).toMatch(/www.reddit.com/);
  });

  it("should returns only docs match land_success filter", async () => {
    const filter = {
      reused: "false",
      with_reddit: "false",
      land_success: "true"
    };
    const sort = { flight_number: 1 };
    const data = await Helper.getRockets(filter, sort);
    expect(data.length).toEqual(43);
    expect(data[0].rocket.first_stage.cores[0].land_success).toBe.true;
  });

  it("should returns only docs match all filters", async () => {
    const filter = {
      reused: "true",
      with_reddit: "true",
      land_success: "true"
    };
    const sort = { flight_number: 1 };
    const data = await Helper.getRockets(filter, sort);
    expect(data.length).toEqual(17);
    expect(data[0].rocket.first_stage.cores[0].reused).toBe.true;
    expect(data[0].rocket.first_stage.cores[0].land_success).toBe.true;
    expect(data[0].links.reddit_campaign).toMatch(/www.reddit.com/);

  });
});
