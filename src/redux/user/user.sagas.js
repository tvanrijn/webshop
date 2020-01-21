import { takeLatest, takeLeading, put, call, all } from "redux-saga/effects";
import { UserActionTypes } from "./user.types";
import {
  auth,
  createUserProfileDocument,
  googleProvider,
  getCurrentUser
} from "../../firebase/firebase.utils";
import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure
} from "./user.actions";

export function* getSnapshotFromUser(user) {
  try {
    const userRef = yield call(createUserProfileDocument, user);
    const snapShot = yield userRef.get();
    yield put(signInSuccess({ id: snapShot.id, ...snapShot.data() }));
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUser(user);
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}

export function* googleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUser(user);
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}

export function* emailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUser(userAuth);
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error.message));
  }
}

export function* onSignOut() {
  yield takeLeading(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* userSagas() {
  yield all([
    call(googleSignInStart),
    call(emailSignInStart),
    call(onCheckUserSession),
    call(onSignOut)
  ]);
}