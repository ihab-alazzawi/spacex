import React from "react";
import Enzyme, { shallow } from "enzyme";
import sinon from "sinon";
import Adapter from "enzyme-adapter-react-16";
import Table from "../components/Table";
import { expect } from "chai";
import TableFilter from "../components/TableFilter";

Enzyme.configure({ adapter: new Adapter() });

describe("Table Component", () => {
  const rockets = [
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
  ];

  const handleChange = sinon.spy();
  const handleRefresh = sinon.spy();
  const reused = false;
  const with_reddit = false;
  const land_success = false;
  const isLoading = false;

  it("renders loading if no data yet", () => {
    const wrapper = shallow(<Table isLoading={true} />);
    const p = wrapper.get(0);

    expect(p).to.deep.equal(<p>...Loading</p>);
  });

  it("renders TableFilter", () => {
    const wrapper = shallow(
      <Table
        handleChange={handleChange}
        handleRefresh={handleRefresh}
        reused={reused}
        with_reddit={with_reddit}
        land_success={land_success}
        isLoading={isLoading}
      />
    );

    const tableFilter = wrapper.find(TableFilter);
    expect(tableFilter).to.have.length(1);
    expect(tableFilter.props().filterProps).to.deep.include({
      handleChange,
      handleRefresh,
      reused,
      with_reddit,
      land_success
    });
  });

  it("renders table with thead and tbody", async () => {
    const wrapper = shallow(<Table isLoading={isLoading} />);

    const table = wrapper.find("table").getElements();
    const tableHead = table[0].props.children[0];
    const tableBody = table[0].props.children[1];

    expect(table[0].type).to.equal("table");
    expect(tableHead.type).to.equal("thead");
    expect(tableBody.type).to.equal("tbody");

    expect(tableHead.props.children.props.children).to.deep.nested.include(
      <th>Badge</th>,
      <th>Rocket Name</th>,
      <th>Rocket Type</th>,
      <th>Launch Date</th>,
      <th>Details</th>,
      <th>ID</th>,
      <th>Article</th>
    );
  });

  it("renders table rows based on data received", () => {
    const wrapper = shallow(<Table isLoading={isLoading} rockets={rockets} />);
    const table = wrapper.find("table").getElements();
    const tableBody = table[0].props.children[1];
    expect(tableBody.props.children).to.have.length(3);
  });
});
