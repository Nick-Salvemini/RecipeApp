import React from 'react';
import { AuthProvider } from './hooks/AuthContext';
import AppRoutes from './AppRoutes';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  console.log('Rendering App component');

  return (
    <AuthProvider>
      <div className="App">
        <AppRoutes />
      </div>
    </AuthProvider>
  );
}

export default App;
