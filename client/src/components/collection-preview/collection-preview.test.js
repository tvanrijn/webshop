import React from "react";
import { shallow } from "enzyme";
import { CollectionPreview } from "./collection-preview.component";
import CollectionItem from "../collection-item/collection-item.component";

describe("CollectionPreview component", () => {
  let wrapper;
  let mockTitle;
  let mockItems;
  let mockHistory;
  let mockMatch;
  let mockRouteName;
  let mockProps;

  beforeEach(() => {
    mockTitle = "Test";
    mockItems = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
    mockHistory = {
      push: jest.fn()
    };
    mockMatch = {
      path: "path"
    };
    mockRouteName = "testroute";

    mockProps = {
      title: mockTitle,
      items: mockItems,
      history: mockHistory,
      match: mockMatch,
      routeName: mockRouteName
    };

    wrapper = shallow(<CollectionPreview {...mockProps} />);
  });

  it("should show the collection title in uppercase", () => {
    expect(wrapper.find("CollectionTitle").text()).toEqual(
      mockTitle.toUpperCase()
    );
  });

  it("should call history.push() when title is clicked", () => {
    wrapper.find("CollectionTitle").simulate("click");
    expect(mockHistory.push).toHaveBeenCalled();
  });

  it("should render maximum 4 items", () => {
    expect(wrapper.find(CollectionItem).length).toEqual(4);
  });

  it("should render no items when collecion has no items", () => {
    const mockProps2 = { ...mockProps, items: [] };
    const wrapper2 = shallow(<CollectionPreview {...mockProps2} />);
    expect(wrapper2.find(CollectionItem).length).toEqual(0);
  });
});
