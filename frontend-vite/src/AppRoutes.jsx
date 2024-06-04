import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import RecipeList from './components/Recipes/RecipeList';
import RecipeDetails from './components/Recipes/RecipeDetails';
import RecipeForm from './components/Recipes/RecipeForm';
import PrivateRoute from './components/Common/PrivateRoute';
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';

const AppRoutes = () => {
    console.log('Rendering routes in AppRoutes');
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/" element={<PrivateRoute><RecipeForm /></PrivateRoute>} />
                <Route path="/recipes" element={<PrivateRoute><RecipeList /></PrivateRoute>} />
                <Route path="/recipe/:id" element={<PrivateRoute><RecipeDetails /></PrivateRoute>} />
                <Route path="/new-recipe" element={<PrivateRoute><RecipeForm /></PrivateRoute>} />
            </Routes>
            <Footer />
        </>
    );
};

export default AppRoutes;