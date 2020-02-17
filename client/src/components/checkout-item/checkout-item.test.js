import React from "react";
import { shallow } from "enzyme";
import { CheckoutItem } from "./checkout-item.component";

describe("CheckoutItem component", () => {
  let wrapper;
  let mockItem;
  let mockRemoveItem;
  let mockAddItem;
  let mockDecreaseQuantity;

  beforeEach(() => {
    mockItem = {
      name: "Blue beanie",
      imageUrl: "/images/mockimage",
      price: 15,
      quantity: 1
    };

    mockRemoveItem = jest.fn();
    mockAddItem = jest.fn();
    mockDecreaseQuantity = jest.fn();

    const mockProps = {
      item: mockItem,
      removeItem: mockRemoveItem,
      addItem: mockAddItem,
      decreaseQuantity: mockDecreaseQuantity
    };

    wrapper = shallow(<CheckoutItem {...mockProps} />);
  });

  it("should display the image with an alt text", () => {
    expect(wrapper.find("img").prop("src")).toEqual(mockItem.imageUrl);
    expect(wrapper.find("img").prop("alt")).toEqual(mockItem.name);
  });

  it("should display the name and price in euros", () => {
    expect(
      wrapper
        .find("TextContainer")
        .at(0)
        .text()
    ).toEqual(mockItem.name);
    expect(
      wrapper
        .find("TextContainer")
        .at(1)
        .text()
    ).toEqual("€" + mockItem.price);
  });

  it("should call removeItem when remove button is clicked", () => {
    wrapper.find("RemoveButtonContainer").simulate("click");
    expect(mockRemoveItem).toHaveBeenCalled();
  });

  it("should show the quantity", () => {
    expect(wrapper.find("QuantityContainer").text()).toContain(
      mockItem.quantity
    );
  });

  it("should call addItem when increase button is clicked", () => {
    wrapper
      .find("QuantityContainer")
      .childAt(2)
      .simulate("click");
    expect(mockAddItem).toHaveBeenCalled();
  });

  it("should call decreaseQuantity when decrease button is clicked", () => {
    wrapper
      .find("QuantityContainer")
      .childAt(0)
      .simulate("click");
    expect(mockDecreaseQuantity).toHaveBeenCalled();
  });
});
