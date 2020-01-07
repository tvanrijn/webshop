import React from "react";
import "./cart-item.styles.scss";

const CartItem = ({ item }) => {
  const { name, imageUrl, price, quantity } = item;
  return (
    <div className="cart-item">
      <img alt={name} src={imageUrl} />
      <div className="item-details">
        <span className="name">{name}</span>
        <span>{quantity} x €{price}</span>
      </div>
    </div>
  );
};

export default CartItem;
