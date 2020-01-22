import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { checkUserSession } from "./redux/user/user.actions";
import "./App.css";
import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInPage from "./pages/signin/sign-in-sign-up-page.component";
import CheckoutPage from "./pages/checkout/checkout.component";

class App extends React.Component {
  componentDidMount() {
    const { checkUserSession } = this.props;
    checkUserSession();
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route
            path="/signin"
            render={() =>
              currentUser !== null ? <Redirect to="/shop" /> : <SignInPage />
            }
          />
          <Route path="/checkout" component={CheckoutPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => {
  return {
    checkUserSession: () => dispatch(checkUserSession())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
