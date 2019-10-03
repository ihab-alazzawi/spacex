import React from "react";
import axios from "axios";
import Enzyme, { shallow } from "enzyme";
import sinon from "sinon";
import Adapter from "enzyme-adapter-react-16";
import App from "../App";
import Table from "../components/Table";
import api from "../api";

Enzyme.configure({ adapter: new Adapter() });

describe("App Component", () => {
  const DATA = {
    data: [
      {
        _id: "abc123",
        rocket: { rocket_name: "r-name1" },
        flight_number: 1,
        links: { mission_patch_small: "http://1img.jpeg" }
      },
      {
        _id: "abc234",
        rocket: { rocket_name: "r-name2" },
        flight_number: 2,
        links: { mission_patch_small: "http://2img.jpeg" }
      },
      {
        _id: "abc345",
        rocket: { rocket_name: "r-name3" },
        flight_number: 3,
        links: { mission_patch_small: "http://3img.jpeg" }
      }
    ]
  };

  const PARAMS = {
    reused: false,
    with_reddit: false,
    land_success: false
  };

  beforeAll(() => {
    sinon.stub(api, "getData");
    sinon.stub(axios, "get");
  });
  beforeEach(async () => {
    api.getData.reset();
    axios.get.reset();
    api.getData.returns(DATA);
  });
  afterAll(() => {
    api.getData.restore();
    axios.get.restore();
  });

  it("renders loading if no data yet", () => {
    api.getData.returns([]);

    const wrapper = shallow(<App />);
    const h1 = wrapper.get(0);

    expect(h1).toEqual(<h1>...Loading</h1>);
    expect(axios.get.calledWith("/api/rockets", { params: PARAMS })).toBe.true;
  });

  it("renders error if error", async () => {
    const error = new Error("some error");
    api.getData.throws(error);

    const wrapper = shallow(<App />);
    const h1 = wrapper.get(0);

    await wrapper.instance().componentDidMount();

    expect(axios.get.calledWith("/api/rockets", { params: PARAMS })).toBe.true;
    expect(wrapper.state("isLoading")).toBe.false;
    expect(h1).toEqual(<h1>some error</h1>);
  });

  it("renders heading with record count", async () => {
    const wrapper = shallow(<App />);
    await wrapper.instance().componentDidMount();
    const heading = wrapper.get(0).props.children[0];
    const count = wrapper.get(0).props.children[1].props.children[1];

    expect(axios.get.calledWith("/api/rockets", { params: PARAMS })).toBe.true;
    expect(heading).toEqual(<h1>SpaceX Launches</h1>);
    expect(count).toEqual(3);
  });

  it("renders Table component with initial props", async () => {
    const wrapper = shallow(<App />);

    await wrapper.instance().componentDidMount();

    const table = wrapper.find(Table);
    const handleChange = wrapper.instance().handleChange;
    const handleRefresh = wrapper.instance().handleRefresh;

    expect(axios.get.calledWith("/api/rockets", { params: PARAMS })).toBe.true;
    expect(table.length).toBe(1);
    expect(table.props()).toEqual({
      rockets: wrapper.state("data"),
      handleChange: handleChange,
      handleRefresh: handleRefresh,
      reused: false,
      with_reddit: false,
      land_success: false,
      isLoading: false
    });
  });
});
