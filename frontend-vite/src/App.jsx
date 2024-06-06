import React from 'react';
import { AuthProvider } from './hooks/AuthContext';
import AppRoutes from './AppRoutes';
import GlobalErrorHandler from './components/errors/GlobalErrorHandler';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Common/Navbar';
import {
  createBrowserRouter, createRoutesFromElements,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';

// console.log('Running on port:', process.env.PORT);

function App() {
  console.log('Rendering App component');

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<LoginForm />} >
        <Route path="/register" element={<RegisterForm />} />

      </Route>
    ))


  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
  /*
  return (
    <Router>
      
        <GlobalErrorHandler>
          <div className="App">
            <AppRoutes />
          </div>
        </GlobalErrorHandler>
      </AuthProvider>
    </Router>
  );
  */
}

export default App;
