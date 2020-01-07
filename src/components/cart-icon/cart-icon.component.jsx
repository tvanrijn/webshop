import React from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { connect } from "react-redux";
import { toggleCart } from "../../redux/cart/cart.actions.js";
import "./cart-icon.styles.scss";

const CartIcon = ({ toggleCart }) => (
  <div className="cart-icon" onClick={toggleCart}>
    <ShoppingIcon className="shopping-icon" />
    <span className="item-count">0</span>
  </div>
);

const mapDispatchToProps = dispatch => {
  return {
    toggleCart: () => dispatch(toggleCart())
  };
};

export default connect(null, mapDispatchToProps)(CartIcon);
