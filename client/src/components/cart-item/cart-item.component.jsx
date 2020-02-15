import React from "react";
import {
  CartItemContainer,
  CartItemImage,
  CartItemDetails
} from "./cart-item.styles";

const CartItem = ({ item }) => {
  const { name, imageUrl, price, quantity } = item;
  return (
    <CartItemContainer>
      <CartItemImage alt={name} src={imageUrl} />
      <CartItemDetails>
        <span>{name}</span>
        <span>
          {quantity} x €{price}
        </span>
      </CartItemDetails>
    </CartItemContainer>
  );
};

export default React.memo(CartItem);
