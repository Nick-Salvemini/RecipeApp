import React from 'react';
import { Link } from 'react-router-dom';
import { AuthProvider, useAuth } from '../../hooks/AuthContext';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className='navbar-brand' to='/'>Recipe Generator</Link>
                <div className='collapse navbar-collapse'>
                    <ul className='navbar-nav mr-auto'>
                        <li className='nav-item'>
                            <Link className='nav-link' to='/'>Home</Link>
                        </li>
                        {isAuthenticated ? (
                            <>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='/recipes'>My Recipes</Link>
                                </li>
                                <li className='nav-item'>
                                    <button className='btn nav-link' onClick={logout}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='/login'>Login</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='/register'>Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Navbar