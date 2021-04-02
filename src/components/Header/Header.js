import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import './Header.css'
const linkStyle={
    textDecoration: 'none',
}
const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    return (
        <div className='header-top'>
            <div className="header">
                <h3>Boi Poka</h3>
                <Link style={linkStyle} className='header-link' to='/shop'>Home</Link>
                <Link style={linkStyle} className='header-link' to='/orders'>Orders</Link>
                <Link style={linkStyle} className='header-link' to='/admin'>Admin</Link>
                <Link style={linkStyle} className='header-link' to='/'>deals</Link>
                {
                    loggedInUser.isSignedIn?<Link style={linkStyle} className='headerLink-user'>{loggedInUser.name}</Link>
                    :<Link to='/login'style={linkStyle} className=' login-button'>Login</Link>
                }
            </div>
        </div>
    );
};

export default Header;