import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import RecipeList from './components/Recipes/RecipeList';
import RecipeDetails from './components/Recipes/RecipeDetails';
import RecipeForm from './components/Recipes/RecipeForm';
import PrivateRoute from './components/Common/PrivateRoute';
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';

const AppRoutes = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/" element={<PrivateRoute component={RecipeForm} />} />
                <Route path="/recipes" element={<PrivateRoute component={RecipeList} />} />
                <Route path="/recipe/:id" element={<PrivateRoute component={RecipeDetails} />} />
                <Route path="/new-recipe" element={<PrivateRoute component={RecipeForm} />} />
            </Routes>
            <Footer />
        </>
    );
};

export default AppRoutes;