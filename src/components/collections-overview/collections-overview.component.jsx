import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCollections } from "../../redux/shop/shop.selectors"
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

const mapStateToProps = createStructuredSelector({
  collections: selectCollections
});

export default connect(mapStateToProps)(CollectionsOverview);
