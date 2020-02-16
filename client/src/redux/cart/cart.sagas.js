import {
  takeLeading,
  takeLatest,
  put,
  all,
  call,
  select
} from "redux-saga/effects";
import { UserActionTypes } from "../user/user.types";
import { CartActionTypes } from "./cart.types";
import {
  emptyCart,
  cartFailure,
  setFirebaseCartStart,
  setFirebaseCartSuccess,
  updateFirebaseCartStart,
  updateFirebaseCartSuccess
} from "./cart.actions";
import { selectCartItems } from "./cart.selectors";
import { selectCurrentUser } from "../user/user.selectors";
import { getFirebaseCart } from "../../firebase/firebase.utils";

export function* emptyCartOnLogOut() {
  try {
    yield put(emptyCart());
  } catch (error) {
    yield put(cartFailure(error.message));
  }
}

export function* setFirebaseCart() {
  try {
    yield put(setFirebaseCartStart());
    const user = yield select(selectCurrentUser);
    const cartItems = yield select(selectCartItems);
    const { firebaseCart } = yield getFirebaseCart(user, cartItems);
    yield put(setFirebaseCartSuccess(firebaseCart));
  } catch (error) {
    yield put(cartFailure(error.message));
  }
}

export function* updateCartInFirebase() {
  try {
    yield put(updateFirebaseCartStart());
    const user = yield select(selectCurrentUser);
    const cartItems = yield select(selectCartItems);
    const { cartRef } = yield getFirebaseCart(user, cartItems);
    yield cartRef.update({ cartItems });
    yield put(updateFirebaseCartSuccess());
  } catch (error) {
    yield put(cartFailure(error.message));
  }
}

export function* emptyCartOnLogOutSuccess() {
  yield takeLeading(UserActionTypes.SIGN_OUT_SUCCESS, emptyCartOnLogOut);
}

export function* setCartOnSignInSucces() {
  yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, setFirebaseCart);
}

export function* updateCartOnCartChange() {
  yield takeLatest(
    [
      CartActionTypes.ADD_ITEM,
      CartActionTypes.REMOVE_ITEM,
      CartActionTypes.DECREASE_QUANTITY
    ],
    updateCartInFirebase
  );
}

export function* cartSagas() {
  yield all([
    call(emptyCartOnLogOutSuccess),
    call(setCartOnSignInSucces),
    call(updateCartOnCartChange)
  ]);
}
