import React from "react";
import { shallow } from "enzyme";
import { CartItem } from "./cart-item.component";

describe("CartItem component", () => {
  let wrapper;
  let mockItem;

  beforeEach(() => {
    mockItem = {
      name: "Blue beanie",
      imageUrl: "/images/mockimage",
      price: 15,
      quantity: 1
    };

    wrapper = shallow(<CartItem item={mockItem} />);
  });

  it("should display the image with an alt text", () => {
    expect(wrapper.find("CartItemImage").prop("src")).toEqual(
      mockItem.imageUrl
    );
    expect(wrapper.find("CartItemImage").prop("alt")).toEqual(mockItem.name);
  });

  it("should display the item name, price and quantity", () => {
      const itemText = wrapper.find("CartItemDetails").text();
      expect(itemText).toContain(mockItem.name);
      expect(itemText).toContain(mockItem.price);
      expect(itemText).toContain(mockItem.quantity);
  })
});
