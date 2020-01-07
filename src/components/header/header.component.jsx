import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/user/user.actions";
import "./header.styles.scss";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { auth } from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

const Header = ({ currentUser, history, setCurrentUser, cartVisible }) => (
  <nav className="header">
    <Link to="/" className="logo-container">
      <Logo className="logo" title="Go to Shop homepage" />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/contact">
        CONTACT
      </Link>
      {currentUser ? (
        <div
          className="option"
          onClick={() => {
            auth.signOut();
            setCurrentUser(null);
            history.push("/signin");
          }}
        >
          SIGN OUT
        </div>
      ) : (
        <Link className="option" to="/signin">
          SIGN IN
        </Link>
      )}
      <CartIcon />
    </div>
    {cartVisible && <CartDropdown />}
  </nav>
);

const mapStateToProps = ({ user: { currentUser }, cart: { cartVisible } }) => ({
  currentUser,
  cartVisible
});

const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser: user => dispatch(setCurrentUser(user))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
