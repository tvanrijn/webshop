import React from "react";
import CollectionItem from "../../components/collection-item/collection-item.component";
import SHOP_DATA from "../shop/shop.data";
import "./collectionpage.styles.scss";

const CollectionPage = ({ match, collections }) => {
  const collection = collections[match.params.collectionId];

  const { title, items } = collection;

  return (
    <div className="category">
      <h2 className="title">{title.toUpperCase()}</h2>
      <div className="items">
        {items.map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

CollectionPage.defaultProps = {
  collections: SHOP_DATA
};

export default CollectionPage;
