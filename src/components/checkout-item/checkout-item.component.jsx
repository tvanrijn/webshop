import React from "react";
import { connect } from "react-redux";
import {
  addItem,
  removeItem,
  decreaseQuantity
} from "../../redux/cart/cart.actions";
import "./checkout-item.styles.scss";

const CheckoutItem = ({ item, addItem, removeItem, decreaseQuantity }) => {
  const { id, name, imageUrl, price, quantity } = item;
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img alt={name} src={imageUrl} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={() => decreaseQuantity(item)}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => addItem(item)}>
          &#10095;
        </div>
      </span>
      <span className="price">€{price}</span>
      <div className="remove-button" onClick={() => removeItem(id)}>
        &#10005;
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    addItem: item => dispatch(addItem(item)),
    removeItem: id => dispatch(removeItem(id)),
    decreaseQuantity: item => dispatch(decreaseQuantity(item))
  };
};

export default connect(null, mapDispatchToProps)(CheckoutItem);
