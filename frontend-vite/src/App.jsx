import React from 'react';
import { AuthProvider } from './hooks/AuthContext';
import AppRoutes from './AppRoutes';
import { BrowserRouter as Router } from 'react-router-dom';
import GlobalErrorHandler from './components/errors/GlobalErrorHandler';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// console.log('Running on port:', process.env.PORT);

function App() {
  console.log('Rendering App component');
  return (
    <Router>
      <AuthProvider>
        <GlobalErrorHandler>
          <div className="App">
            <AppRoutes />
          </div>
        </GlobalErrorHandler>
      </AuthProvider>
    </Router>
  );
}

export default App;
