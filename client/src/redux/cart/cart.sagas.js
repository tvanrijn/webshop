import { takeLeading, put, all, call } from "redux-saga/effects";
import { UserActionTypes } from "../user/user.types";
import { emptyCart, emptyCartFailure } from "./cart.actions";

export function* emptyCartOnLogOut() {
  try {
    yield put(emptyCart());
  } catch (error) {
    yield put(emptyCartFailure(error.message));
  }
}

export function* emptyCartOnLogOutSuccess() {
  yield takeLeading(UserActionTypes.SIGN_OUT_SUCCESS, emptyCartOnLogOut);
}

export function* cartSagas() {
    yield all([
      call(emptyCartOnLogOutSuccess),
    ]);
  }
  