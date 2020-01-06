import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import { auth } from '../../firebase/firebase.utils';

const Header = ({ currentUser, history }) => (
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
                        onClick={() => {
                            auth.signOut();
                            history.push("/signin");
                        }}
                    >SIGN OUT</div>
                    :
                    <Link className='option' to="/signin">SIGN IN</Link>
            }
        </div>
    </nav>
)

const mapStateToProps = (state) => ({ 
    currentUser: state.user.currentUser 
})

export default withRouter(connect(mapStateToProps)(Header));