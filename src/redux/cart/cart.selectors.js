import { createSelector } from "reselect";

const selectCart = state => state.cart;

export const selectCartVisible = createSelector(
  [selectCart],
  cart => cart.cartVisible
);

export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    )
);
