import React from "react";
import { withRouter } from 'react-router-dom';
import {
  CollectionPreviewContainer,
  CollectionTitle,
  PreviewContainer
} from "./collection-preview.styles";
import CollectionItem from "../collection-item/collection-item.component";

export const CollectionPreview = ({ title, items, history, match, routeName }) => (
  <CollectionPreviewContainer>
    <CollectionTitle onClick={() => history.push(`${match.path}/${routeName}`)}>
      {title.toUpperCase()}
    </CollectionTitle>
    <PreviewContainer>
      {items.slice(0, 4).map(item => (
        <CollectionItem key={item.id} item={item} />
      ))}
    </PreviewContainer>
  </CollectionPreviewContainer>
);

export default withRouter(CollectionPreview);
