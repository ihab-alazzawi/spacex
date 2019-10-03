import React from "react";
import Enzyme, { shallow } from "enzyme";
import sinon from "sinon";
import Adapter from "enzyme-adapter-react-16";
import { expect } from "chai";
import Refresh from '../components/Refresh'


Enzyme.configure({ adapter: new Adapter() });

describe("Refresh Component", () => {


  it("calls handleRefresh onClick", () => {
    const handleRefresh = sinon.spy();

    const wrapper = shallow(<Refresh handleRefresh={handleRefresh}/>);

    const btn=wrapper.find('button')
    btn.props().onClick()
    expect(handleRefresh.called).to.be.true
  });
});
