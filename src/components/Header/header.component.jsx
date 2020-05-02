import React from 'react';
import './header.styles.scss';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/4.1 crown.svg';
import { auth } from '../../firebase/firebase.util';


const Header = ({ currentUser }) => (
    <div className="header">
        <Link className="logo-container" to="">
            <Logo className="logo"></Logo>
        </Link>
        <div className="options">
            <Link className='option' to='/shop'> Shop</Link>
            <Link className='option' to='/shop'> Contact</Link>
            {
                currentUser ?
                    <div className='option' onClick={() => auth.signOut()}>Sign Out</div>
                    :
                    <Link className='option' to='/signin'> Sign In</Link>
            }

        </div>
    </div>
);
export default Header;
