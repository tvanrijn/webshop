import React from "react";
import SHOP_DATA from "../../pages/shop/shop.data";
import CollectionPreview from "../collection-preview/collection-preview.component";
import { CollectionsOverviewContainer } from './collections-overview.styles';

const CollectionsOverview = ({ collections }) => (
  <CollectionsOverviewContainer>
    {Object.keys(collections).map(key => {
      const { id, ...props } = collections[key];
      return <CollectionPreview key={id} {...props} />;
    })}
  </CollectionsOverviewContainer>
);

CollectionsOverview.defaultProps = {
  collections: SHOP_DATA
};

export default CollectionsOverview;
