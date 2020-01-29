import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCollections } from "../../redux/shop/shop.selectors";
import CollectionItem from "../../components/collection-item/collection-item.component";
import {
  CategoryContainer,
  CategoryTitle,
  ItemsContainer
} from "./collectionpage.styles";

const CollectionPage = ({ match, collections }) => {
  const collection = collections[match.params.collectionId];

  const { title, items } = collection;

  return (
    <CategoryContainer>
      <CategoryTitle>{title.toUpperCase()}</CategoryTitle>
      <ItemsContainer>
        {items.map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </ItemsContainer>
    </CategoryContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  collections: selectCollections
});

export default connect(mapStateToProps)(CollectionPage);
