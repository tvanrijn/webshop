import React, { useEffect, lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { checkUserSession } from "./redux/user/user.actions";
import { GlobalStyle } from "./global.styles";
import Header from "./components/header/header.component";
import Spinner from "./components/spinner/spinner.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";

const SignInPage = lazy(() =>
  import("./pages/signin/sign-in-sign-up-page.component")
);
const CheckoutPage = lazy(() => import("./pages/checkout/checkout.component"));
const HomePage = lazy(() => import("./pages/homepage/homepage.component"));
const ShopPage = lazy(() => import("./pages/shop/shop.component"));

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div>
      <GlobalStyle />
      <Header />
      <Switch>
        <Suspense fallback={<Spinner />}>
          <Route
            exact
            path="/"
            component={(props) => (
              <ErrorBoundary>
                <HomePage {...props}/>
              </ErrorBoundary>
            )}
          />
          <Route
            path="/shop"
            component={(props) => (
              <ErrorBoundary>
                <ShopPage {...props}/>
              </ErrorBoundary>
            )}
          />
          <Route
            path="/signin"
            render={(props) =>
              currentUser !== null ? (
                <Redirect to="/shop" />
              ) : (
                <ErrorBoundary>
                  <SignInPage {...props}/>
                </ErrorBoundary>
              )
            }
          />
          <Route
            path="/checkout"
            component={(props) => (
              <ErrorBoundary>
                <CheckoutPage {...props}/>
              </ErrorBoundary>
            )}
          />
        </Suspense>
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => {
  return {
    checkUserSession: () => dispatch(checkUserSession())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
