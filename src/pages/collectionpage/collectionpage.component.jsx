import React from "react";
import CollectionItem from "../../components/collection-item/collection-item.component";
import SHOP_DATA from "../shop/shop.data";
import { CategoryContainer, CategoryTitle, ItemsContainer } from "./collectionpage.styles";

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

CollectionPage.defaultProps = {
  collections: SHOP_DATA
};

export default CollectionPage;
