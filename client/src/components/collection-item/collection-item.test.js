import React from "react";
import { shallow } from "enzyme";
import { CollectionItem } from "./collection-item.component";

describe("CollectionItem component", () => {
  let wrapper;
  let mockItem;
  let mockAddItem;

  beforeEach(() => {
    mockItem = {
      name: "Blue beanie",
      imageUrl: "/images/mockimage",
      price: 15,
      quantity: 1
    };

    mockAddItem = jest.fn();

    const mockProps = {
      item: mockItem,
      addItem: mockAddItem
    };

    wrapper = shallow(<CollectionItem {...mockProps} />);
  });

  it("should show the item image, name and price", () => {
    expect(wrapper.find("BackgroundImage").prop("imageUrl")).toEqual(
      mockItem.imageUrl
    );
    expect(wrapper.find("CollectionFooter").text()).toEqual(
      mockItem.name + mockItem.price
    );
  });

  it("should call addItem when add button is clicked", () => {
    wrapper.find("AddButton").simulate("click");
    expect(mockAddItem).toHaveBeenCalled();
  });
});
