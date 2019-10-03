import React from "react";
import Enzyme, { mount } from "enzyme";
import sinon from "sinon";
import Adapter from "enzyme-adapter-react-16";
import { expect } from "chai";
import Checkbox from "../components/Checkbox";
import Refresh from "../components/Refresh";
import TableFilter from "../components/TableFilter";

Enzyme.configure({ adapter: new Adapter() });

describe("TableFilter Component", () => {
  it("renders Refresh component", () => {
    const filterProps = {
      handleRefresh: sinon.spy()
    };
    const wrapper = mount(<TableFilter filterProps={filterProps} />);
    const refresh = wrapper.find(Refresh);
    expect(refresh).to.have.length(1);
    expect(refresh.prop("handleRefresh")).to.be.a("function");
  });

  it("renders land_success checkbox", async () => {
    const filterProps = {
      land_success: false,
      handleChange: sinon.spy()
    };
    const wrapper = mount(<TableFilter filterProps={filterProps} />);
    const checkbox1 = wrapper.find(Checkbox).filter({ id: "land_success" });
    expect(checkbox1).to.have.length(1);
    expect(checkbox1.prop("handleChange")).to.be.a("function");
    expect(checkbox1.prop("isChecked")).to.be.false;
    const newProps = {
      land_success: true,
      handleChange: sinon.spy()
    };
    wrapper.setProps({ filterProps: newProps });
    wrapper.update();
    const checkboxAfter = wrapper.find(Checkbox).filter({ id: "land_success" });
    expect(checkboxAfter.prop("isChecked")).to.be.true;
  });

  it("renders reused checkbox", () => {
    const filterProps = {
      reused: false,
      handleChange: sinon.spy()
    };
    const wrapper = mount(<TableFilter filterProps={filterProps} />);
    const checkbox2 = wrapper.find(Checkbox).filter({ id: "reused" });
    expect(checkbox2).to.have.length(1);
    expect(checkbox2.prop("handleChange")).to.be.a("function");
    const newProps = {
        reused: true,
        handleChange: sinon.spy()
      };
      wrapper.setProps({ filterProps: newProps });
      wrapper.update();
      const checkboxAfter = wrapper.find(Checkbox).filter({ id: "reused" });
      expect(checkboxAfter.prop("isChecked")).to.be.true;
  });

  it("renders with_reddit checkbox", () => {
    const filterProps = {
      with_reddit: false,
      handleChange: sinon.spy()
    };
    const wrapper = mount(<TableFilter filterProps={filterProps} />);
    const checkbox3 = wrapper.find(Checkbox).filter({ id: "with_reddit" });
    expect(checkbox3).to.have.length(1);
    expect(checkbox3.prop("handleChange")).to.be.a("function");
    const newProps = {
        with_reddit: true,
        handleChange: sinon.spy()
      };
      wrapper.setProps({ filterProps: newProps });
      wrapper.update();
      const checkboxAfter = wrapper.find(Checkbox).filter({ id: "with_reddit" });
      expect(checkboxAfter.prop("isChecked")).to.be.true;
  });
});
