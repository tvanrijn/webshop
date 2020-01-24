import { CartActionTypes } from "./cart.types";

export const toggleCart = () => ({
  type: CartActionTypes.TOGGLE_CART
});

export const addItem = item => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item
});

export const removeItem = id => ({
  type: CartActionTypes.REMOVE_ITEM,
  payload: id
});

export const decreaseQuantity = item => ({
  type: CartActionTypes.DECREASE_QUANTITY,
  payload: item
});

export const emptyCart = () => ({
  type: CartActionTypes.EMPTY_CART
});

export const emptyCartFailure = errorMessage => ({
  type: CartActionTypes.EMPTY_CART_FAILURE,
  payload: errorMessage
});
