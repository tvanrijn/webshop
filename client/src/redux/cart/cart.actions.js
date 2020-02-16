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

export const cartFailure = errorMessage => ({
  type: CartActionTypes.CART_FAILURE,
  payload: errorMessage
});

export const setFirebaseCartStart = () => ({
  type: CartActionTypes.SET_FIREBASE_CART_START
});

export const setFirebaseCartSuccess = cartItems => ({
  type: CartActionTypes.SET_FIREBASE_CART_SUCCESS,
  payload: cartItems
});

export const updateFirebaseCartStart = () => ({
  type: CartActionTypes.UPDATE_FIREBASE_CART_START
});

export const updateFirebaseCartSuccess = () => ({
  type: CartActionTypes.UPDATE_FIREBASE_CART_SUCCES
});
