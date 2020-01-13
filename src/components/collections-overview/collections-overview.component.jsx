import React from "react";
import SHOP_DATA from "../../pages/shop/shop.data";
import CollectionPreview from "../collection-preview/collection-preview.component";
import "./collections-overview.styles.scss";

const CollectionsOverview = ({ collections }) => (
  <div className="collections-overview">
    {Object.keys(collections).map(key => {
      const { id, ...props } = collections[key];
      return <CollectionPreview key={id} {...props} />;
    })}
  </div>
);

CollectionsOverview.defaultProps = {
  collections: SHOP_DATA
};

export default CollectionsOverview;
