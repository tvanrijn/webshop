import { CartActionTypes } from "./cart.types";
import { addItemToCart, decreaseQuantity } from "./cart.utils";

const INITIAL_STATE = {
  cartVisible: false,
  cartItems: []
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART:
      return {
        ...state,
        cartVisible: !state.cartVisible
      };
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload)
      };
    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload)
      };
    case CartActionTypes.DECREASE_QUANTITY:
      return {
        ...state,
        cartItems: decreaseQuantity(state.cartItems, action.payload)
      }
    case CartActionTypes.EMPTY_CART:
      return {
        ...state,
        cartItems: []
      }
    default:
      return state;
  }
};

export default userReducer;
