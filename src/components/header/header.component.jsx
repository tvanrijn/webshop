import React from 'react';
import { Link } from 'react-router-dom';
import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from '../../firebase/firebase.utils';

const Header = ({ currentUser }) => (
    <nav className='header'>
        <Link to="/" className='logo-container'>
            <Logo className='logo' title='Go to Shop homepage' />
        </Link>
        <div className='options'>
            <Link className='option' to="/shop">SHOP</Link>
            <Link className='option' to="/contact">CONTACT</Link>
            {
                currentUser ?
                    <div
                        className='option'
                        onClick={() => auth.signOut()}
                    >SIGN OUT</div>
                    :
                    <Link className='option' to="/signin">SIGN IN</Link>
            }
        </div>
    </nav>
)

export default Header;