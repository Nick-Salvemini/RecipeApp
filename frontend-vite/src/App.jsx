import React from 'react';
import { AuthProvider } from './hooks/AuthContext';
import AppRoutes from './AppRoutes';
import GlobalErrorHandler from './components/errors/GlobalErrorHandler';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

console.log('Running on port:', process.env.PORT);

function App() {
  return (
    <AuthProvider>
      <GlobalErrorHandler>
        <div className="App">
          <AppRoutes />
        </div>
      </GlobalErrorHandler>
    </AuthProvider>
  );
}

export default App;
