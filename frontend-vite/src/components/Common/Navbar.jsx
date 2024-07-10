import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';

const Navbar = () => {
    const { state, dispatch } = useAuth();

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <header>
            <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top">
                <div className="container">
                    <Link className='navbar-brand' to='/'>Flavor Craft</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className='collapse navbar-collapse justify-content-center' id="navbarNav">
                        <ul className='navbar-nav'>
                            {state.isAuthenticated ? (
                                <>
                                    <li className='nav-item'>
                                        <Link className='nav-link' to='/recipes'>My Recipes</Link>
                                    </li>
                                    <li className='nav-item'>
                                        <button className='btn nav-link' onClick={handleLogout}>Logout</button>
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
                </div>
            </nav>
        </header>
    )
}

export default Navbar