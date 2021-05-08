import React from "react";
import { shallow } from "enzyme";
import MainQuestion from "./MainQuestion";

describe("MainQuestion", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<MainQuestion />);
    expect(wrapper).toMatchSnapshot();
  });
});
