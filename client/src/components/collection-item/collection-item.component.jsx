import React from "react";
import { connect } from "react-redux";
import { addItem } from "../../redux/cart/cart.actions";
import {
  CollectionItemContainer,
  BackgroundImage, 
  AddButton, 
  CollectionFooter,
  NameContainer,
  PriceContainer
} from "./collection-item.styles";

const CollectionItem = ({ item, addItem }) => {
  const { imageUrl, name, price } = item;
  return (
    <CollectionItemContainer>
      <BackgroundImage className='image' imageUrl={imageUrl} />
      <CollectionFooter>
        <NameContainer>{name}</NameContainer>
        <PriceContainer>{price}</PriceContainer>
      </CollectionFooter>
      <AddButton inverted onClick={() => addItem(item)}>
        Add to cart
      </AddButton>
    </CollectionItemContainer>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    addItem: item => dispatch(addItem(item))
  };
};

export default connect(null, mapDispatchToProps)(CollectionItem);
