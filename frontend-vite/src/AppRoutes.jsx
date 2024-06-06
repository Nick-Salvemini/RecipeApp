import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Outlet } from 'react-router-dom';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import RecipeList from './components/Recipes/RecipeList';
import RecipeDetails from './components/Recipes/RecipeDetails';
import RecipeForm from './components/Recipes/RecipeForm';
import PrivateRoute from './components/Common/PrivateRoute';
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';
import GlobalErrorHandler from './components/errors/GlobalErrorHandler';

const Layout = () => (
    <>
        <Navbar />
        <Outlet />
        <Footer />
        <GlobalErrorHandler />
    </>
);

const routes = createRoutesFromElements(
    <Route path="/" element={<Layout />}>
        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<RegisterForm />} />
        <Route path="/" element={<PrivateRoute><RecipeForm /></PrivateRoute>} />
        <Route path="recipes" element={<PrivateRoute><RecipeList /></PrivateRoute>} />
        <Route path="recipe/:id" element={<PrivateRoute><RecipeDetails /></PrivateRoute>} />
        <Route path="new-recipe" element={<PrivateRoute><RecipeForm /></PrivateRoute>} />
    </Route>
);

const router = createBrowserRouter(routes);

const AppRoutes = () => {
    console.log('Rendering routes in AppRoutes');
    return (
        <RouterProvider router={router} />
    );
};

export default AppRoutes;