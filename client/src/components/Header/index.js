import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import Card from 'react-bootstrap/Card'
import Nav from 'react-bootstrap/Nav'

const Header = () => {
    const logout = event => {
        event.preventDefault();
        Auth.logout();
    };
    
    return (
        <Card.Header>
            <div>
                <Link to="/">
                    <h1>Book-Ends</h1>
                </Link>

                <nav className="ms-auto">
                {Auth.loggedIn() ? (
                    <>
                    <Link to="/profile">My Profile </Link>
                    <a href="/" onClick={logout}>
                        Logout
                    </a>
                    </>
                ) : (
                    <>
                    <Link to="/login">Login  or  </Link > 
                    <Link  to="/signup">Signup</Link>
                    </>

                  )}
                </nav>
            </div>
        </Card.Header>
    );
};

export default Header;