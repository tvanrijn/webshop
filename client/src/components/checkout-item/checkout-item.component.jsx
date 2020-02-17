import React from "react";
import { connect } from "react-redux";
import {
  addItem,
  removeItem,
  decreaseQuantity
} from "../../redux/cart/cart.actions";
import {
  CheckoutItemContainer,
  ImageContainer,
  TextContainer,
  QuantityContainer,
  RemoveButtonContainer
} from "./checkout-item.styles";

export const CheckoutItem = ({ item, addItem, removeItem, decreaseQuantity }) => {
  const { id, name, imageUrl, price, quantity } = item;
  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img alt={name} src={imageUrl} />
      </ImageContainer>
      <TextContainer>{name}</TextContainer>
      <QuantityContainer>
        <div onClick={() => decreaseQuantity(item)}>&#10094;</div>
        <span>{quantity}</span>
        <div onClick={() => addItem(item)}>&#10095;</div>
      </QuantityContainer>
      <TextContainer>€{price}</TextContainer>
      <RemoveButtonContainer onClick={() => removeItem(id)}>
        &#10005;
      </RemoveButtonContainer>
    </CheckoutItemContainer>
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
