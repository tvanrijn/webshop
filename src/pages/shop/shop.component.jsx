import React from 'react';
import SHOP_DATA from "./shop.data.js";
import CollectionPreview from '../../components/collection-preview/collection-preview.component';

const ShopPage = ({ collections }) => (
    <div className='shop-page'>
        {collections.map(({id, ...props}) => (
            <CollectionPreview key={id} {...props} />
        ))}
    </div>
)

ShopPage.defaultProps = {
    collections: SHOP_DATA
}

export default ShopPage;