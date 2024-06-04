import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
/*
 for dir in src/componentns; do
  find "$dir" -type f -name "*.js" -exec bash -c 'mv "$0" "${0%.js}.jsx"' {} \;
  done
*/