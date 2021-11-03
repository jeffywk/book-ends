import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
    const logout = event => {
        event.preventDefault();
        Auth.logout();
    };
    
    return (
        <header className="navbar">
            <div className="container">
                <Link to="/">
                    <h1>Book-Ends</h1>
                </Link>

                <nav>
                {Auth.loggedIn() ? (
                    <>
                    <Link to="/profile" className="m-2">My Profile</Link>
                    <a href="/" className="m-2" onClick={logout}>
                        Logout
                    </a>
                    </>
                ) : (
                    <>
                    <Link to="/login" className="m-2">Login</Link>
                    <Link to="/signup" className="m-2">Signup</Link>
                    </>
                )}
                </nav>
            </div>
        </header>
    );
};

export default Header;