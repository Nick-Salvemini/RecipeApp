import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';
import FlavorCraftNamePlate from '../../assets/images/FlavorCraftNamePlate.png';
import '../../styles/navbar.css';

const Navbar = () => {
    const { state, dispatch } = useAuth();
    const location = useLocation();
    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    const isMyRecipes = location.pathname === '/recipes';
    const isRecipeDetail = location.pathname.startsWith('/recipes/') && !isMyRecipes;

    return (
        <header>
            <nav className="navbar navbar-expand-sm custom-navbar fixed-top">
                <div className="container">
                    <Link className='navbar-brand' to='/'>
                        <img src={FlavorCraftNamePlate} alt="Flavor Craft" height="60" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className='collapse navbar-collapse justify-content-center' id="navbarNav">
                        <ul className='navbar-nav'>
                            {state.isAuthenticated ? (
                                <>
                                    {isMyRecipes && (
                                        <li className='nav-item'>
                                            <Link className='nav-link' to='/'>Home</Link>
                                        </li>
                                    )}
                                    {isRecipeDetail && (
                                        <>
                                            <li className='nav-item'>
                                                <Link className='nav-link' to='/'>Home</Link>
                                            </li>
                                            <li className='nav-item'>
                                                <Link className='nav-link' to='/recipes'>My Recipes</Link>
                                            </li>
                                        </>
                                    )}
                                    {!isMyRecipes && !isRecipeDetail && (
                                        <li className='nav-item'>
                                            <Link className='nav-link' to='/recipes'>My Recipes</Link>
                                        </li>
                                    )}
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