import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './routes.jsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
