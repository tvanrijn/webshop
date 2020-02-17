import React from "react";
import { shallow } from "enzyme";
import { CartIcon } from "./cart-icon.component";

describe("CartIcon component", () => {
  let wrapper;
  let mockItemCount;
  let mockToggleCart;

  beforeEach(() => {
    mockItemCount = 0;
    mockToggleCart = jest.fn();

    const mockProps = {
      itemCount: mockItemCount,
      toggleCart: mockToggleCart
    };

    wrapper = shallow(<CartIcon {...mockProps} />);
  });

  it("should call toggleCart when icon is clicked", () => {
    wrapper.find("CartIconContainer").simulate("click");
    expect(mockToggleCart).toHaveBeenCalled();
  });

  it("should render the itemCount as the text", () => {
    const itemCount = parseInt(wrapper.find("ItemCountContainer").text());
    expect(itemCount).toBe(0);
  });
});
