import React from "react";
import { mount } from "enzyme";
import { CartDropdown } from "./cart-dropdown.component";
import CartItem from "../cart-item/cart-item.component";
import { toggleCart } from "../../redux/cart/cart.actions";

describe("CartDropdown component", () => {
  let wrapper;
  let mockHistory;
  let mockDispatch;
  const mockCartItems = [{ id: 1 }, { id: 2 }, { id: 3 }];

  beforeEach(() => {
    mockHistory = {
      push: jest.fn()
    };

    mockDispatch = jest.fn();

    const mockProps = {
      cartItems: mockCartItems,
      history: mockHistory,
      dispatch: mockDispatch
    };

    wrapper = mount(<CartDropdown {...mockProps} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should call history.push and toggleCart when button is clicked", () => {
    expect(wrapper.find("CartDropdownButton").text()).toEqual("GO TO CHECKOUT");
    wrapper.find("CartDropdownButton").simulate("click");
    expect(mockHistory.push).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(toggleCart());
  });

  it("should render an equal number of CartItem components as the cartItems prop", () => {
    expect(wrapper.find(CartItem).length).toEqual(mockCartItems.length);
  });

  it("should render EmptyMessageContainer if cartItems is empty", () => {
    const mockProps = {
      cartItems: [],
      history: mockHistory,
      dispatch: mockDispatch
    };

    const newWrapper = mount(<CartDropdown {...mockProps} />);
    expect(newWrapper.exists("EmptyMessageContainer")).toBe(true);
    newWrapper.unmount();
  });
});
