import React from 'react';
import './cart-dropdown.styles.scss';
import Button from '../custom-button/custom-button.component';

const CartDropdown = () => (
    <div className='cart-dropdown'>
        <div className='cart-items' />
        <Button>GO TO CHECKOUT</Button>
    </div>
)

export default CartDropdown;