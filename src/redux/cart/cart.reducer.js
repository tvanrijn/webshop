import { CartActionTypes } from './cart.types';

const INITIAL_STATE = {
    cartVisible: false
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CartActionTypes.TOGGLE_CART:
            return {
                ...state,
                cartVisible: !state.cartVisible
            }
        default:
            return state;
    }
}

export default userReducer;