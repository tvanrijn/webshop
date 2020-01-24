import {
  takeLatest,
  takeLeading,
  put,
  call,
  all,
  getContext,
  select
} from "redux-saga/effects";
import { UserActionTypes } from "./user.types";
import {
  auth,
  createUserProfileDocument,
  googleProvider,
  getCurrentUser
} from "../../firebase/firebase.utils";
import {
  signInSuccess,
  userActionFailure,
  signOutSuccess,
  signUpSuccess
} from "./user.actions";
import { selectErrorMessage } from "../../redux/user/user.selectors";

export function* getSnapshotFromUser(user, additionalData) {
  try {
    const userRef = yield call(createUserProfileDocument, user, additionalData);
    const snapShot = yield userRef.get();
    yield put(signInSuccess({ id: snapShot.id, ...snapShot.data() }));
  } catch (error) {
    yield put(userActionFailure(error.message));
  }
}

export function* handleError(action) {
  const errorMessage = yield select(selectErrorMessage);

  if (errorMessage) {
    alert(`Your ${action} has failed. Please try again.`);
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUser(user);
  } catch (error) {
    yield put(userActionFailure(error.message));
    yield handleError("login");
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
    yield put(userActionFailure(error.message));
    yield handleError("login");
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
    yield put(userActionFailure(error.message));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
    const history = yield getContext("history");
    yield history.push("/signin");
  } catch (error) {
    yield put(userActionFailure(error.message));
    yield handleError("logout");
  }
}

export function* onSignOut() {
  yield takeLeading(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* signUp({ payload: { displayName, email, password } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(signUpSuccess({ user, additionalData: { displayName } }));
  } catch (error) {
    yield put(userActionFailure(error.message));
    yield handleError("sign up");
  }
}

export function* onSignUp() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* signInAfterSignUpSuccess({
  payload: { user, additionalData }
}) {
  yield getSnapshotFromUser(user, additionalData);
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUpSuccess);
}

export function* userSagas() {
  yield all([
    call(googleSignInStart),
    call(emailSignInStart),
    call(onCheckUserSession),
    call(onSignOut),
    call(onSignUp),
    call(onSignUpSuccess)
  ]);
}
