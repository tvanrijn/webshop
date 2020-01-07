import { CartActionTypes } from './cart.types';
import { addItemToCart } from './cart.utils';

const INITIAL_STATE = {
    cartVisible: false,
    cartItems: []
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CartActionTypes.TOGGLE_CART:
            return {
                ...state,
                cartVisible: !state.cartVisible
            }
        case CartActionTypes.ADD_ITEM:
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload)
            }
        default:
            return state;
    }
}

export default userReducer;